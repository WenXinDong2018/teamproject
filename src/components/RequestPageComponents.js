import React, { Component } from 'react';
import Moment from "react-moment"
import { Button} from 'react-bootstrap';
import { Card, CardText, CardBody, CardSubtitle, CardTitle, Row, Col, Badge, Alert } from 'reactstrap';
import {parseFullName} from 'parse-full-name';
const MethodsOfPayment = ["venmo", "cash", "applePay", "paypal", "cash app", "zelle", "other"];

export const payment = (request) => {

    return (
    <CardText> {<strong>Method(s) of Payment: </strong>} 
    {MethodsOfPayment.map((method)=> {
        if(request[method] && request[method]===true) {
            return (method + "; ")
        }
    })} </CardText>)
    
}

export const Updates = (updates) => {
    const res = updates.map((update) => {
        return (
            <div key={update._id} className="col-12">
                <Alert light> <b>{update.name}: </b>{update.content}</Alert>
            </div>
        );
    });

    return res;
}


export const RenderRequestOrder = (props) => {
    let bordercolor = props.request.priority? "orange":"green";
    return (
        <Card className = "shadow"  style={{ marginBottom: "20px", border: "solid", borderColor: bordercolor }}>
            <CardBody>
                <CardTitle>
                    <Row>
                        <Col xs={8}>
                            <b><p style={{ fontSize: "1.5rem", display: "inline" }}> {props.request.city}, {props.request.zipcode} </p></b>
                        </Col>
                        <div className={"col-xs-3  ml-auto"} style = {{marginRight: "10px"}}>
                            <h4 ><Badge color="info">{props.request.store}</Badge></h4>
                        </div>
                    </Row>
                </CardTitle>

                <CardSubtitle>{parseFullName(props.request.buyerName).first + " " + parseFullName(props.request.buyerName).last[0] +'.' }</CardSubtitle>
                <br></br>
                <CardText>{<strong>Need before : </strong>} <Moment format="MMM DD">{props.request.buyerDate.toDate() }</Moment></CardText>
                {payment(props.request)}
                <CardText> {<strong>Shopping List consists of </strong>} </CardText>
                <CardText className="text-center"> {props.request.numItems} {props.request.typeErrand} items</CardText>
                <CardText> {<strong>Estimated cost </strong>}: ${props.request.price} </CardText>

                <hr />
                <div className="text-center">
                    <Button size="lg" variant='success' onClick={() => props.toggleModal(props.request)}>
                        Offer to deliver <i class="fa fa-heart" aria-hidden="true"></i>
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}