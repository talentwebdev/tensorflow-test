import React, { Component } from "react"; 
import "./style.css";

class CustomButton extends Component {
  render() {
    return (
     <div className="button" style={this.props.style}>
         {this.props.text}
     </div>
    );
  }
}

export default CustomButton;