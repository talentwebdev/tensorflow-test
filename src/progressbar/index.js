import React, { Component } from "react"; 
import "./style.css";

class ProgressBar extends Component {
  render() {
    return (
        <div>
            <img  alt="OREO"  src={require("./../assets/oreo-trolls-mobile-home-scan-xs.jpg")} className="back-image"></img>
            <h1 className="progress-number">{this.props.value}%</h1>
        </div>
    );
  }
}

export default ProgressBar;