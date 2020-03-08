import React, {Component} from "react";
import {initCamera, initSrc} from "../interfaces/video";
import {getStream} from "../interfaces/getUserMedia";
import * as tensorflow from "../interfaces/tensorflow";
import * as state from "../interfaces/state";
import config from "../data/config";
import NavigationBar from "./../navigation-bar";
import Logo from "./../logo";
import CustomButton from "./../button";
import ProgressBar from "./../progressbar";


class TensorflowTest extends Component {
    mystyles = {        
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
      };
    static getMetadata () {
        return {
            path      : "/debug/tensorflow",
            container : ".debug-tensorflow"
        };
    }
    constructor (props) {
        super(props);
        this.state = {
            ready       : false,
            predictions : [],
            widthFirst  : "0vw",
            widthSecond : "0vw",
            widthThird  : "0vw"
        };

        state.on("settings/tensorflow-test/video-src", src => {
            if (this.video) {
                initSrc(`/assets/video/${src}.mp4`, this.video);
            }
        });
    }
    componentDidMount () {
        const onComplete = () => {
            this.canvas = tensorflow.getCanvas();
            this.ctx    = this.canvas.getContext("2d");
            //this.ctx.filter  = "brighness(300%)";
            this.setState({ready: true});
            predict();
        };
        const onError = error => {
            console.log("error enabling camera", error);
            console.log(error.stack);
        };

        const predict = async () => {
            const predictions = await tensorflow.predict();
            this.setState({predictions});
            this.tid = setTimeout(predict, config.tensorflow.samplerate);
        };

        tensorflow.load(this.refs.video)
            .then(getStream)
            .then(initCamera(this.refs.video))
            .then(onComplete)
            .catch(onError);
        
    }
    componentDidUpdate(prePros) {
        if (!this.state.predictions || !this.state.predictions[0]) {
            return "";
        }
        const p = this.state.predictions;
        const w2 = (p[2].value * 100).toFixed(2);
        console.log("component updated: ", w2);
        if(w2 > 0.6) {
            console.log("go to next");
            tensorflow.stop();
            window.location.assign('https://www.oreo.com/');

        }
    }
    componentWillUnmount () {
        this.canvas = null;
        clearTimeout(this.tid);
        tensorflow.stop();
        tensorflow.dispose();
    }
    render () {
        return (
            <div className="container tensorflow-test">
                <NavigationBar
                />
                <video className="test-video" style={this.mystyles} ref="video" muted playsInline autoPlay></video>
                <div className="canvas-container" ></div>
                <CustomButton style={{position: "absolute", width: '30%', bottom: 50, right: 20}} text="Back"></CustomButton>
                <div style={{position:'relative', width:'100%', height:'100%'}}></div>                
                <Logo></Logo>
                <img src={require("./../assets/pg.png")} alt="PG" style={{position: "absolute", bottom: 20, right: 20}}></img>
            </div>
        );
    }

    renderPredictionGraph () {
        if (!this.state.predictions || !this.state.predictions[0]) {
            return "";
        }
        const p = this.state.predictions;
        const w0 = (p[0].value * 100).toFixed(2);
        const w1 = (p[1].value * 100).toFixed(2);
        const w2 = (p[2].value * 100).toFixed(2);
        const styles = {
            container1 : {
                zIndex          : 200,
                overflowX       : "visible",
                backgroundColor : 'red',
                position        : "absolute",
                transition      : "all 2s",
                textAlign       : "left",
                color           : "white",
                fontFamily      : "PlutoRegular",
                top             : "-50px"
            },
            container2 : {
                zIndex          : 200,
                backgroundColor : 'black',
                overflow        : "visible",
                position        : "absolute",
                transition      : "width 2s",
                color           : "white",
                textAlign       : "left",
                fontFamily      : "PlutoRegular",
                top             : "-25px"
            },
            container3 : {
                zIndex          : 200,
                backgroundColor : 'blue',
                overflow        : "visible",
                position        : "absolute",
                transition      : "width 2s",
                color           : "white",
                textAlign       : "left",
                fontFamily      : "PlutoRegular"
            },
            spanStyle : {
                position   : "relative",
                color      : "white",
                fontFamily : "PlutoRegular",
                display    : "block",
                width      : "100vw"
            },
            holder : {
                overflow : "Visible",
                bottom   : "50px",
                left     : "0px",
                position : "absolute"
            }
        };
        const { container1, container2, container3, spanStyle, holder } = styles;
        return (
            <div style={holder}>
                {this.state.predictions[0] &&
                    <div >
                        <div style={container1}>
                            <span style={spanStyle}>{p[0].label + ": " + w2}</span>

                        </div>
                        <div style={container2}>
                            <span style={spanStyle}>{p[1].label + ": " + w0}</span>
                        </div>
                        <div style={container3}>
                            <span style={spanStyle}>{p[2].label + ": " + w1}</span>
                        </div>
                    </div>
                }
            </div>
        );
    }

    renderPredictions () {
        return (<table>
            <thead>
                <tr>
                    <th>Class</th>
                    <th>Confidence</th>
                </tr>
            </thead>
            <tbody>
                {this.state.predictions.map((prediction, i) => (
                    <tr key={i}>
                        <td>{prediction.label}</td>
                        <td>{prediction.value.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }
    renderTop () {
        const top = this.state.predictions[0];
        if (top && top.value > 0.8) {
            return (<div>Predicted {top.label} with {parseInt(top.value * 100)}% confidence</div>);
        } else {
            return (<div>Nothing met confidence threshold</div>);;
        }
    }
}
export default TensorflowTest;
