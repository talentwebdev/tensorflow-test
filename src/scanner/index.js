import React, {Component} from "react";
import * as state from "../interfaces/state";
import {getStream, stopStream, hasStream} from "../interfaces/getUserMedia";
import {initCamera, initSrc} from "../interfaces/video";
import {fadeEnter, fadeExit, Animation} from "../animations";
import * as tf from "../interfaces/tensorflow";
import config from "../data/config";
import {timings} from "../animations/scanning";
import {pipe, path, repeat, useWith, complement, equals, __} from "ramda";
import {prizeRevealEnterFadeOut} from "../animations/prize-reveal";

const pathChanged     = pipe(path, repeat(__, 2), useWith(complement(equals)));
const locationChanged = pathChanged(["location", "pathname"]);
const webGLStatusChanged = pathChanged(["webgl_status"]);

const prizeRevealFade = Animation({
    targets  : ".camera-wrapper",
    opacity  : 0,
    delay    : 5000,
    duration : 1000,
    easing   : "linear"
});

const debugProceed = ctx => {
    let count = 0;

    const onclick = () => {
        if (++count >= 3) {
            ctx.onFoundCookie();
            remove();
        }
    };

    const remove = () => {
        window.removeEventListener("mousedown", onclick);
        window.removeEventListener("touchstart", onclick);
    };

    window.addEventListener("mousedown", onclick);
    window.addEventListener("touchstart", onclick);

    return remove;
};

class Scanner extends Component {
    static getMetadata () {
        return {
            path            : "/(scan|scanning-tips|twist|prize-reveal|lose|consolation|second-attempt|faq)",
            globalStateKeys : ["webgl_status", "upload_type"],
            key             : "scanner",
            exact           : false
        };
    }
    constructor (props) {
        super(props);
        console.log("constructor:   ");
        this.showing = false;
        this.video   = React.createRef();

        this.show = () => {
            if (!this.showing) {
                console.log("scanner :: showing");
                this.showing = true;
                fadeEnter({targets: ".camera-wrapper"});
                if (config.tensorflow.debugProceed && this.props.location.pathname === "/scan") {
                    this.removeDebugListeners = debugProceed(this);
                }
            }
        };

        this.hide = () => {
            if (this.showing) {
                console.log("scanner :: hiding");
                this.showing = false;
                fadeExit({targets: ".camera-wrapper"});
                if (this.removeDebugListeners) {
                    this.removeDebugListeners();
                    this.removeDebugListeners = null;
                }
            }
        };

        this.onFoundCookie = () => {
            console.log("scanner :: found cookie");
            tf.stop();
            state.set("upload_type", "product");
            state.set("found_cookie", true);
            state.set("scanning", false);
        };

        this.onError = error => {
            console.warn("error loading scanner");
            console.log(error);
            this.props.history.push("/enter-without-camera");
        };

        this.loadVideoStream = () => {
            console.log("scanner :: loading video stream");
            return getStream()
                .then(initCamera(this.video.current));
        };

        this.loadTensorflow = () => {
            console.log("scanner :: loading tensorflow");
            return tf.load(this.video.current);
        };

        this.startTf = () => {
            console.log("scanner :: starting cookie scanner");
            this.show();
            // because we start animations on scanning = true, adding a delay here before we actually start
            // scanning to that tensorflow does not clobber the app's framerate

            setTimeout(() => {
                tf.find(this.onFoundCookie);
            }, timings.overlayRevealDuration);

            state.set("scanning", true);
        };

        this.startScanning = () => this.loadTensorflow()
            .then(this.loadVideoStream)
            .then(this.startTf)
            .then(this.show)
            .catch(this.onError);

        // during dev we can jump directly to the twist page, this function starts the video in that case
        this.onJumpedToTwistPage = () => {
            tf.dispose();
            if (hasStream()) {
                this.show();
            } else {
                this.loadVideoStream()
                    .then(this.show)
                    .catch((error) => {
                        this.hide();
                        console.error(error);
                    });
            }
        };

        this.enterPrizeReveal = () => {
            console.log("scanner :: entering prize reveal page");
            const finished = prizeRevealEnterFadeOut({targets: ".camera-wrapper"}).finished;
            finished.then(() => {
                console.log("scanner :: stopping tensorflow and video stream");
                //tf.dispose();
                stopStream();
            });
        };
    }
    onPathChange () {
        const path = this.props.location.pathname;
        console.log("scanner :: path changed ", path);
        switch (path) {
            case "/scan":
                console.log("scanner :: returning to scan page from another page");
                // we're returning to the scan page, so start tensroflow
                if (tf.isLoaded()) {
                    console.log("scanner :: tf was already loaded");
                    if (hasStream()) {
                        console.log("scanner :: already had a media stream");
                        this.startTf();
                    } else {
                        console.log("scanner :: did not have a media stream, loading new media stream");
                        this.startScanning();
                    }
                } else {
                    console.log("scanner :: tensorflow wasn't loaded, loading now");
                    this.startScanning();
                }
                break;
            case "/faq":
            case "/scanning-tips":
                state.set("scanning", false);
                // stop tensroflow, and fade out the video
                console.log("scanner :: entered scanning tips page, stopping tensorflow, and hiding the video");
                stopStream();
                tf.stop();
                this.hide();
                // when entering scanning tips, fade out
                break;
            case "/twist":
                console.log("scanner :: arrived directly on twist page");
                this.onJumpedToTwistPage();
                break;
            // on any of the below, just fade out
            case "/prize-reveal":
            case "/lose":
            case "/consolation":
            case "/second-attempt":
                state.set("scanning", false);
                console.log("scanner :: landed on prize page");
                if (this.props.webgl_status === "entering") {
                    console.log("scanner :: prize reveal was loaded, calling enterPrizeReveal");
                    this.enterPrizeReveal();
                } else {
                    console.log("scanner :: prize reveal isn't loaded yet, waiting...");
                    this.onPrizeRevealLoaded = this.enterPrizeReveal;
                }
                break;
            default:
                console.log(`scanner :: scanner should not exist on pathname:: ${this.props.location.pathname}`);
        }
    }
    onWebGLStatusChange (status) {
        if (status === "entering" && this.onPrizeRevealLoaded && /prize|lose|consolation|second/.test(this.props.location.pathname)) {
            console.log("scanner :: prize reveal was loaded, starting fade out");
            this.onPrizeRevealLoaded();
            this.onPrizeRevealLoaded = null;
        }
    }
    componentDidUpdate (prevProps) {
        if (this.props.upload_type === "amoe") {
            return;
        }

        if (webGLStatusChanged(prevProps, this.props)) {
            this.onWebGLStatusChange(this.props.webgl_status);
        }

        if (locationChanged(prevProps, this.props)) {
            this.onPathChange(this);
        }
    }
    componentWillUnmount () {
        if (this.removeDebugListeners) {
            this.removeDebugListeners();
        }
        state.set("scanning", false);
        tf.dispose();
        stopStream();
    }
    componentDidMount () {
        this.startScanning();
        // this.onJumpedToTwistPage();
    }
    onEntered () {
        if (this.props.upload_type === "amoe") {
            return;
        }
        console.log("scanner :: on entered");

        switch (this.props.location.pathname) {
            case "/scan":
                this.startScanning();
                break;

            // if we jumped directly to these pages (during dev), jus show the camera
            case "/twist":
                this.onJumpedToTwistPage();
                break;
            case "/prize-reveal":
            case "/lose":
            case "/consolation":
            case "/second-attempt":
                break;

        }
    }
    onEnter () {
        console.log("scanner :: on enter");
        // intentional no-op here
    }
    onExit () {
        console.log("scanner :: on exit");
        fadeExit({targets: ".camera-wrapper"});
    }
    render () {
        if (this.props.upload_type === "amoe") {
            return "";
        } else {
            return (
                <div className="camera-wrapper" style={{opacity: 0}}>
                    <video className="scan-camera" muted playsInline autoPlay loop ref={this.video}></video>
                </div>
            );
        }
    }
}
export default Scanner;
