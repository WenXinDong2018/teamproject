import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import Image from 'react-bootstrap/Image'


class indexPage extends Component{
    
    render(){
        return(
            <Jumbotron>
                <div className="container row-header">
                    <div className="inner">
                        <div className="row">
                            <Image src={require("../img/logo.png")} />
                        </div>
                        <div className="row title">
                            <div className="col-12">
                                <h1>Get your essentials on Pony Express</h1>
                                <p>Faster, safer, warmer</p>
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
            </Jumbotron>
        );
    }



}


export default indexPage;


