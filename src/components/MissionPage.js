import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

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
                </div>
            </div>
        );
    }



}

export default MissionPage;

