import React, { Component, useState } from 'react';
import {payment} from "./RequestPageComponents";
import {
    Card, Modal, ListGroup, CardText, CardBody,
    CardTitle,  Button, Badge, Row, Col, Alert, ListGroupItem, ModalBody, ModalHeader,
} from 'reactstrap';
import {renderNote} from "./MyOrdersPageComponents"
import { Link } from "react-router-dom";
import Moment from "react-moment"
//component for rendering a single notification
const RenderNotification = (props) => {
    return (
        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: "green" }}>


            <CardBody>
                <CardText> <strong>Order Number: {props.notification._id}</strong></CardText>
                <Alert color = {props.color}><strong>{props.notification.content}</strong></Alert>
                <CardText>
                   <small><strong>Last updated </strong><Moment fromNow >{props.notification.createdAt.toDate()}</Moment>  </small>
                </CardText>
                <div className = "text-center"><Button  color={props.color} onClick = {(e)=> props.handleViewDetails(e,props.notification)}>View Details</Button></div>
            </CardBody>

        </Card>
    );
}

export class RenderOrder extends Component {
    
    constructor(props){
        super(props);

    }
    render(){
        if(!this.props.request){
            return <></>
        }
        let bordercolor = this.props.request.priority? "orange":"green";
    return (
        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: bordercolor }}>
           <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style = {{marginBottom:0}}> <b>Request placed <Moment fromNow>{this.props.request.createdAt.toDate()}</Moment> </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{fontSize:"1rem"}} color="info" >{this.props.request.store}</Badge> , need before <Badge style ={{fontSize:"1rem"}} color="success" ><Moment format = "MMM DD">{this.props.request.buyerDate.toDate()}</Moment></Badge> </div>

                </Row>
            <hr></hr>
            
                <ListGroup>
                    {this.props.request.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>x{shoppingItem.quantity}</Badge>
                                <div className = "pull-right inline text-right"><small>{shoppingItem.replace? "Replace if n/a":"Don't replace if n/a"}</small></div>

                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
                {renderNote(this.props.request.note)}
                <CardText> {<strong>Estimated cost </strong>}: {this.props.request.price} </CardText>
                <CardText> <strong>{this.props.request.buyerName}'s Phone number: </strong>{this.props.request.buyerPhone}</CardText>
                <CardText> <strong>{this.props.request.buyerName}'s Address: </strong>{this.props.request.address1},  {this.props.request.address2},  {this.props.request.city} {this.props.request.zipcode}</CardText>

                <CardText> <strong> {this.props.request.driverName}'s Phone number: </strong> {this.props.request.driverPhone}</CardText>
            <CardText> <strong>Delivery date: </strong> <Moment format = "MMM DD">{this.props.request.driverDate.toDate()}</Moment></CardText>
            {payment(this.props.request)}                

            </CardBody>

        </Card>
    );
}
}

const unreadMenu = (notifications, handleViewDetails) => notifications.map((notification) => {
    if (notification.unread) {
        return (
            <div key={notification._id} className="col-12 col-md-6">
                <RenderNotification notification={notification} color="success" handleViewDetails = {handleViewDetails}/>
            </div>
        );
    }
});

const readMenu = (notifications, handleViewDetails) => notifications.map((notification) => {
    if (!notification.unread) {
        return (
            <div key={notification._id} className="col-12 col-md-6">
                <RenderNotification notification={notification} color="secondary" handleViewDetails = {handleViewDetails}/>
            </div>
        );
    }
});

class NotificationsPage extends Component {

    constructor(props) {
        super(props);
        let unreadLength = 0;
        this.props.notifications.forEach( notification => unreadLength+=notification.unread );
        this.state = {
            unreadPostsLength: unreadLength,
            unread: true,
            all: true,
            dropdownOpen: false,
            isModalOpen: false,
            chosenNotification: null,
            chosenUnread: true,
            notificationId:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleViewDetails = this.handleViewDetails.bind(this);
    }
    toggleModal(){
        console.log("toggleModal")        

        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
        // console.log("chosen notification check", this.state.chosenNotification)

            if(this.state.chosenNotification && this.state.chosenUnread){
                console.log("chosen notification is unread")
                this.props.updateNotification(this.state.notificationId);
            }

    }

    handleViewDetails(event, notification){
        console.log("handleViewDetails")        
        this.props.myRequests.map((request) => {
            if(request._id === notification.orderId){
                this.setState({
                    chosenNotification: request,
                    chosenUnread: notification.unread,
                    notificationId: notification._id
                })
            }
        })
        this.props.myDeliveries.map((request) => {
            if(request._id === notification.orderId){
                this.setState({
                    chosenNotification: request,
                    chosenUnread: notification.unread,
                    notificationId: notification._id
                })
            }
        })
        
        this.toggleModal(event);
        event.preventDefault();

        
    }

    handleChange(filters) {
        // console.log("current filter", filters);
        this.setState({
            unread: filters.unread,
            all: filters.all,
        })
    }

    render() {
        const renderMenu = () => {
            if (this.state.all) {
                return (
                    <>
                        {unreadMenu(this.props.notifications, this.handleViewDetails)}
                        {readMenu(this.props.notifications,this.handleViewDetails)}
                    </>)
            }
            if (this.state.unread) {
                return (
                    unreadMenu(this.props.notifications,this.handleViewDetails)
                )
            }
            return (
                readMenu(this.props.notifications,this.handleViewDetails)
            )
        }
        return (
            <>
            <div className="container">
                <Row>

                    <br></br>
                    <Col xs={12}>
                        <h3>Notifications <Badge color="success">{this.state.unreadPostsLength} Updates</Badge></h3>
                    </Col>

                </Row>
                <Row className = "justify-content-center">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={() => this.handleChange({ unread: true, all: false })} />
                    <label class="form-check-label" for="inlineRadio1">Unread</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={() => this.handleChange({ unread: false, all: false })} />
                    <label class="form-check-label" for="inlineRadio2">Read</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" defaultChecked name="inlineRadioOptions" id="inlineRadio3" value="option3" onClick={() => this.handleChange({ unread: true, all: true })} />
                    <label class="form-check-label" for="inlineRadio3" >All</label>
                </div>
                </Row>
                

                {/* <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#" active>
                                    General
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">
                                    System Notifications
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div> */}
                    <br/>
                <div className = {"col-md-10 offset-md-1"} style = {{minHeight : "100%"}} >
                    <Row>
                {renderMenu()}
                </Row>
                </div>
                
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}></ModalHeader>
            <ModalBody>
            <RenderOrder request = {this.state.chosenNotification} />
            </ModalBody>
        </Modal>
        </>

        );
    }

}



export default NotificationsPage;