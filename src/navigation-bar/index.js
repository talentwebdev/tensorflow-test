import React, { Component } from "react"; 
import './style.css';
import { IoMdCart } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {FaExternalLinkAlt} from "react-icons/fa";

class NavigationBar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            isNavBar: false,
            isNavBarOpen: false,
        }
    }
    render() {
        return (
            <div className="preheader">
                <nav className="col-12 mynavbar">
                    <div className={this.state.isNavBar === false ? "mobilebtn" : "mobilebtn open" } onClick={() => {this.setState({isNavBar: !this.state.isNavBar})}}><span></span><span></span><span></span><span></span></div>
                    <a className="mybrand logoShadow" href="index.html"><img className="img-fluid" src={require("./../assets/logo3.png")} alt="OREO" /></a>
                    <div className="navbox" style={this.state.isNavBar === false ? {} : {display: "block"}}>
                        <div className="mycol">
                            <ul className="mymenu">
                                <li className={this.state.isNavBarOpen === false ? "hasMenu" : "hasMenu open" }>
                                    <div className="navlink" onClick={() => {this.setState({isNavBarOpen: !this.state.isNavBarOpen})}}>
                                        <span className="sp">OREO.COM 
                                        {
                                            this.state.isNavBarOpen === false ? <IoIosArrowDown style={{float: "right"}}></IoIosArrowDown> : <IoIosArrowUp style={{float: "right"}}></IoIosArrowUp>
                                        }
                                        </span>   
                                    </div>
                                    <div className="mydropdown">
                                        <div className="innerDropdown">
                                            <ul className="navlist">
                                                <li><a href="#">THE STUF INSIDE</a></li>
                                                <li><a href="thins.html">OREO THINS</a></li>
                                                <li><a href="chocolate-candy.html">OREO CHOCOLATE CANDY</a></li>
                                                <li><a href="#">RECIPES</a></li>
                                                <li><a href="404.html">404 PAGE</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="navlink">
                                        <a href="https://shop.oreo.com/" target="_blank">SHOPOREO.COM <FaExternalLinkAlt style={{float: "right"}}></FaExternalLinkAlt></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <a className="cartbtn" href="#"><IoMdCart size={25}></IoMdCart></a>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;