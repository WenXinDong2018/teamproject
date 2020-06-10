import React, { Component } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle,
    Alert, ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { Button, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { payment } from "./RequestPageComponents";

//component for rendering requester's note to driver
export function renderNote(note) {
    if (note === "" || !note) {
        return <></>
    } else {
        return (<><br /><Alert >Note to driver: {note}</Alert></>);
    }
}

//component for showing thank you note in modal
export function renderThankYouNote(note, user) {
    if (note === "" || !note) {
        return <></>
    } else {
        return (<><Alert color="warning">Thank You Note from {user}: {note}</Alert></>);
    }
}
//component for rendering requester's thank you note to driver
export function Thankyou(toggleModal, request) {
    if (request.thankyounote) {
        return <Alert color="warning">Thank You Note: {request.thankyounote}</Alert>
    } else {
        return <div className="text-center"><Button color="warning" onClick={() => toggleModal(request)}> Send a thank you note!</Button></div>
    }
}

export function renderDriverInfo(request, toggleModal) {
    if (request.driverName === "" || request.driverName === undefined) {
        return (
            <>
                <hr></hr>
                <CardText> <strong>Status: </strong>Waiting for delivery offer </CardText>
                {payment(request)}
            </>
        )

    } else {
        return (
            <>
                <hr></hr>
                <CardText> <strong>Status:</strong> {request.driverName} is offering delivery.</CardText>
                <CardText> <strong> Contact Phone number: </strong> {request.driverPhone}</CardText>
                <CardText> <strong>Delivery date: </strong>{request.driverName} is delivering on <Moment format="MMM DD">{request.driverDate.toDate()}</Moment></CardText>
                {payment(request)}
                {Thankyou(toggleModal, request)}

            </>
        );
    }
}

export class RenderRequestOrder extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        let bordercolor = this.props.request.priority ? "orange" : "green";

        return (
            <Card className="shadow" style={{ marginBottom: "20px", border: "solid", borderColor: bordercolor }}>
                <CardBody>
                    <Row >
                        <div class="col-auto mr-auto"><CardTitle style={{ marginBottom: 0 }}> <b>Request placed <Moment fromNow>{this.props.request.createdAt.toDate()}</Moment> </b></CardTitle></div>
                        <div class="col-auto"><Badge style={{ fontSize: "1rem" }} color="info" >{this.props.request.store != "Other" ? this.props.request.store : this.props.request.otherstore}</Badge> , need before <Badge style={{ fontSize: "1rem" }} color="success" ><Moment format="MMM DD">{this.props.request.buyerDate.toDate()}</Moment></Badge> </div>

                    </Row>
                    <hr></hr>

                    <ListGroup>
                        {this.props.request.shoppingList.map((shoppingItem) => {
                            return (
                                <ListGroupItem className="justify-content-between">
                                    {shoppingItem.item} <Badge pill>x{shoppingItem.quantity}</Badge>
                                    <div className="pull-right inline text-right"><small>{shoppingItem.replace ? "Replace if n/a" : "Don't replace if n/a"}</small></div>

                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                    {renderNote(this.props.request.note)}
                    <Row style={{ marginBottom: 0, marginTop: "1rem" }}>
                        <Col>
                            <CardText> {<strong>Estimated cost: </strong>} ${this.props.request.price} </CardText>
                            <CardText> {<strong>Courtesy Tip:</strong>} ${this.props.request.tip} </CardText>

                        </Col>
                    </Row>
                    {renderDriverInfo(this.props.request, this.props.toggleModal)}
                </CardBody>

            </Card>
        );
    }
}

export const RenderDeliveryOrder = (props) => {
    let bordercolor = props.delivery.priority ? "orange" : "green";

    return (

        <Card className="shadow" style={{ marginBottom: "20px", border: "solid", borderColor: bordercolor }}>
            <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style={{ marginBottom: 0 }}> <b>Delivering to {props.delivery.buyerName} </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{ fontSize: "1rem" }} color="info" >{props.delivery.store != "Other" ? props.delivery.store : props.delivery.otherstore}</Badge> , on <Badge style={{ fontSize: "1rem" }} color="success" ><Moment format="MMM DD">{props.delivery.driverDate.toDate()}</Moment></Badge> </div>

                </Row>
                <hr></hr>

                <ListGroup>
                    {props.delivery.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>x{shoppingItem.quantity}</Badge>
                                <div className="pull-right inline text-right"><small>{shoppingItem.replace ? "Replace if n/a" : "Don't replace if n/a"}</small></div>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>

                {renderNote(props.delivery.note)}
                <Row style={{ marginBottom: 0, marginTop: "1rem" }}>
                    <Col>
                        <CardText> {<strong>Estimated cost: </strong>}${props.delivery.price} </CardText>
                        <CardText> {<strong>Courtesy Tip:</strong>} ${props.delivery.tip} </CardText>
                    </Col>
                </Row>
                <hr></hr>
                <CardText> <strong>{props.delivery.buyerName}'s Phone number: </strong>{props.delivery.buyerPhone}</CardText>
                <CardText> <strong>{props.delivery.buyerName}'s Address: </strong>{props.delivery.address1},  {props.delivery.address2},  {props.delivery.city} {props.delivery.zipcode}</CardText>
                {payment(props.delivery)}
                {renderThankYouNote(props.delivery.thankyounote, props.delivery.buyerName)}

            </CardBody>

        </Card>
    );
}