import React, { Component } from "react"; 
import './style.css';

class Logo extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            isNavBar: false,
        }
    }
    render() {
        return (
            <div className="logo">
                <img className="img-fluid" src={require("./../assets/trolls-world-tour-mobile.png")} alt="OREO" />
            </div>
        );
    }
}

export default Logo;