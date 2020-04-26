import React, { Component } from 'react';
import { Jumbotron, Button, CardHeader, Card, CardBody } from 'reactstrap';
import {QA} from "../shared/qa";

class QAPage extends Component{
    
    render(){
        return(
            <div className = "container">
                {QA.map((qa) => {
                    return (
                    <div className = "col-10 offset-1">
                    <Card style= {{borderColor: "green"}}>

                        <CardHeader><strong>{qa.question}</strong></CardHeader>
                        <CardBody>{qa.answer}</CardBody>
                    </Card>
                    <br/>
                    </div>

                    
                    )
                } )}


            </div>
        );
    }



}

export default QAPage;


