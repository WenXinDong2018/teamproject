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
                        Thank you for choosing PonyExpress! <br/>
                        This service was created by a group of Stanford undergraduates (<em>want to know more about them?</em> <a href="#about">click here</a>) who wanted to help people stay safe during the COVID-19 pandemic while also fostering community growth and collaboration. 
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
                                <div className="picback">
                                    <Image src={require("../img/wenxin.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Computer Science Major<br/>Stanfard University Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Wenxin Dong</h2>
                                <h4>email</h4>
                                
                            </div>
                            <div className="member m2 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/Vincent.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Chemistry Major (Biological Chemistry Concentration)<br/>Stanfard University Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Vincent Chim</h2>
                                <h4>email</h4>
                            </div>
                            <div className="member m3 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/Michelle.png")} className="picture"/>
                                    <div className="bio">
                                        <p>Computer Science Major<br/>Stanfard University Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Michelle Qin</h2>
                                <h4>email</h4>
                                
                            </div>
                            <div className="member m4 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/Allison.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Biology Major<br/>Stanford Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Allison Wang</h2>
                                <h4>allisonzhang@stanford.edu</h4>
                            </div>
                            <div className="member m5 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/Chris.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Physics Major<br/>Stanford Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Chris Kim</h2>
                                <h4>chankyo@stanford.edu</h4>
                            </div>
                            <div className="member m6 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/George.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Mathematics Major<br/>Stanford Class of 2023</p>
                                    </div>
                                </div>
                                <h2>George Nakayama</h2>
                                <h4>w4756677@stanford.edu</h4>
                            </div>
                            <div className="member m7 col-xs-12 col-sm-4">
                                <div className="picback">
                                    <Image src={require("../img/Ella.jpg")} className="picture"/>
                                    <div className="bio">
                                        <p>Biology Major<br/>Stanford Class of 2023</p>
                                    </div>
                                </div>
                                <h2>Ella Wang</h2>
                                <h4>email</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }



}

export default MissionPage;

