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
            <div className="logo" style={{textAlign: "left",}}>
                <img className="img-fluid" src={require("./../assets/trolls-world-tour-mobile.png")} alt="OREO" />
                <p style={{width: '100%', fontSize: '8px', color: "#4E4E45"}}>Dreamworks Trolls World Tour © 2020<br></br> Dreamworks Animation LLC. All Rights Reserved.<br></br> Soundtrack Now Available.</p>
            </div>
        );
    }
}

export default Logo;