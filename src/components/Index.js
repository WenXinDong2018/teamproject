import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

const $ = require('jquery');
const API_KEY = "AIzaSyDa3rpFFC1s8yfMD9SPWVEtXVR6K_-TAUU";

class indexPage extends Component {

    render() {
        return (
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col - 12 col-sm-6">
                            <h1>Pony Express</h1>
                            <p>Fast, Easy, Safe! </p>
                        </div>
                    </div>
                </div>


                <script src="jquery-3.5.0.js"></script>
                <div id="wrapper">
                    <button id="location-button" onClick={getLoc()}>Get User Location</button>
                    <div id="output"></div>
                </div>

            </Jumbotron>

        );
    }



}

function getLoc() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDa3rpFFC1s8yfMD9SPWVEtXVR6K_-TAUU&latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=false", function (data) {
                console.log(data);
            });
        });
    }
}

export default indexPage;


