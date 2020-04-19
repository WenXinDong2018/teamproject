import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image'


class indexPage extends Component{
    
    render(){
        return(
            <Jumbotron>
                <div className="row-header">
                    <div className="inner col-7">
                        <div className="row">
                            <Image src={require("../img/logo.png")} fluid/>
                        </div>
                        <div className="row title">
                            <div className="col-12">
                                <h1>Get your essentials on Pony Express</h1>
                                <p>Faster, warmer, safer</p>
                            </div>   
                        </div> 
                    </div>
                </div>
                <div className="container paragraph">
                    <p>
                        Ending pandemic is all about working together. 
                        The creators of PonyExpress want to help communities engage in social distancing by coordinating trips for essential items groceries. 
                        This is not a delivery service by rather a way for people to connect and collaborate.
                    </p>
                </div>
                <div className="container signUp">
                    <h1>What to see the shopping trips going on around you? Want to spread warmth to your neighbors by offer delivery? </h1>
                     <h1>Click to <a href="./Index.js">Sign UP</a>!</h1>
                </div>
                <div className="container learnMore">
                    <h1>To learn more about current COVID-19 situation, click here to <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target="_blank">Learn More</a>!</h1>
                    <p>Stay Home, Stay Safe!</p>
                </div>
            </Jumbotron>
        );
    }



}


export default indexPage;


