import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';


class indexPage extends Component{

    render(){
        return(
            <Jumbotron>
                <div className = "container">
                    <div className = "row row-header">
                        <div className = "col - 12 col-sm-6">
                            <h1>Pony Express</h1>
                            <p>Fast, Easy, Safe ! </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>


        );
    }



}


export default indexPage;


