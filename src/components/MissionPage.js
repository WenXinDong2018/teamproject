import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image'

class MissionPage extends Component{
    
    render(){
        return(
            <div className="mission">
                <div className="missionttl">
                    <h1><span>Our Missions</span></h1>
                    <h2>Together, we will overcome all difficulties.</h2>
                </div>
                <div className="content">
                    <div className="col-xs-12">
                        <h1 className="catch"><span id="one">Connect</span> <span id="two">Community</span></h1>
                        <div className="paragraph">
                        <p>
                        Thank you for using PonyExpress! 
                        This service was created by a group of Stanford undergraduates (want to know more aboutthem ? <a href="#about">click here</a>) who wanted to help people stay safe during the COVID-19 pandemic while also fostering community growth and collaboration. 
                        PonyExpress allows people to get essential items in a way that’s fast, easy and safe. Grocery stores are a breeding ground for COVID-19 transmission, particularly for the elderly and immunocompromised. 
                        However, people don’t have much of a choice: online vendors are dealing with large demand and low stock; grocery-delivery services are receiving backlash from pressuring workers to continue deliveries through the pandemic. 
                        With PonyExpress, we match drivers with shoppers in the community to coordinate and condense trips to stores. When you use our app, you can practice social distancing while getting the supplies you need—all with the help of your neighbors.
                        </p>
                    </div>
                    </div>
                </div>
                <div className="about" id="about">
                    <div className="missionttl">
                        <h1><span>Our Team</span></h1>
                    </div>
                    <div className="aboutcontent">
                        <div className=" row">
                            <div className="member m1 col-xs-12 col-sm-4">
                                <Image src={require("../img/wenxin_dong.jpg")} className="picture"/>
                                <h2>Wenxin Dong</h2>
                                <h2>position</h2>
                                <div className="bio">
                                    <p>Your Bio</p>
                                </div>
                            </div>
                            <div className="member m2 col-xs-12 col-sm-4">
                                <Image src={require("../img/logo.png")} className="picture"/>
                                <h2>Your Name</h2>
                                <h2>position</h2>
                                <div className="bio">
                                    <p>Your Bio</p>
                                </div>
                            </div>
                            <div className="member m3 col-xs-12 col-sm-4">
                                <Image src={require("../img/logo.png")} className="picture"/>
                                <h2>Your Name</h2>
                                <h2>position</h2>
                                <div className="bio">
                                    <p>Your Bio</p>
                                </div>
                            </div>
                            <div className="member m4 col-xs-12 col-sm-4">
                                <Image src={require("../img/logo.png")} className="picture"/>
                                <h2>Your Name</h2>
                                <h2>position</h2>
                                <div className="bio">
                                    <p>Your Bio</p>
                                </div>
                            </div>
                            <div className="member m5 col-xs-12 col-sm-4">
                                <Image src={require("../img/logo.png")} className="picture"/>
                                <h2>Your Name</h2>
                                <h2>position</h2>
                                <div className="bio">
                                    <p>Your Bio</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }



}

export default MissionPage;

