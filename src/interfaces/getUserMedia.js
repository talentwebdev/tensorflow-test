import Modernizr from "./modernizr";
import ga_events from "./analytics/ga-events";

const constraints = {
    "audio" : false,
    "video" : {
        facingMode : "environment",
        width      : Modernizr.mq("(max-width: 839px)") ? undefined : 1280
    }
};

let stream;
let LOADING = false;
let CANCEL  = true;

export const hasStream = () => Boolean(stream);

export const getStream = async () => {
    if (Modernizr.getusermedia) {
        if (!stream) {
            LOADING = true;
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            ga_events.allowed_camera();
            document.body.classList.add("scanning");
        }
        if (CANCEL) {
            CANCEL = false;
            stopStream();
        }
        LOADING = false;
        return stream;
    } else {
        return await Promise.reject(new Error("getUserMedia not supported"));
    }
};

export const stopStream = async () => {
    if (LOADING) {
        CANCEL = true;
        return;
    }
    if (stream) {
        Array.from(stream.getVideoTracks()).forEach(track => {
            track.stop();
        });
        stream = null;
        document.body.classList.remove("scanning");
    } else {
        return false;
    }
};
