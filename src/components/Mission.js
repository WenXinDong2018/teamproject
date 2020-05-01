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
                    </div>
                    <div className="paragraph">
                        <p>Pony Express is a volunteer-based delivery service that seeks to condense trips to grocery stores, thereby promoting social distancing efforts while ensuring access to essential resources. Our service allows people to rely on others in their community to deliver groceries, thus reducing risk of infection.</p>
                    </div>
                </div>
            </div>
        );
    }



}

export default MissionPage;


