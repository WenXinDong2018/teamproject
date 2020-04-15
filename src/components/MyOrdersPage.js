import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, CardSubtitle, CardHeader, CardFooter,
    Alert, ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
//component for rendering a single request

function renderNote(note){
    if(note === ""){
        return <></>
    }else{
        return (  <><br/><Alert light>Note to driver: {note}</Alert></>);
    }
}
function renderDriverInfo(request){
    if(request.driverName === "" || request.driverName === undefined){
        return <></>
    }else{
        return(
            <>
            <hr></hr>
            <CardText>{request.driverName} is offering delivery.</CardText>
            <CardText> Contact Phone number: {request.driverPhone}</CardText>
            <CardText> {request.driverName} is delivering on {request.driverDate}</CardText>
            <div className = "text-center"><Button color = "warning" > Send a thank you note!</Button></div>
            </>
        );
    }
}



const RenderRequestOrder = (props) => {
    

    
    return (
        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: "green" }}>
           <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style = {{marginBottom:0}}> <b>Request placed on {props.request.createdAt} </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{fontSize:"1rem"}} color="info" >{props.request.store}</Badge> , before <Badge style ={{fontSize:"1rem"}} color="success" >{props.request.date}</Badge> </div>

                </Row>
            <hr></hr>
            
                <ListGroup>
                    {props.request.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
               
                {renderNote(props.request.note)}
                
                {renderDriverInfo(props.request)}
                

            </CardBody>

        </Card>
    );
}

const RenderDeliveryOrder = (props) => {
    return (

        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: "green" }}>
           <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style = {{marginBottom:0}}> <b>Deliverying to {props.delivery.buyerName} </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{fontSize:"1rem"}} color="info" >{props.delivery.store}</Badge> , on <Badge style ={{fontSize:"1rem"}} color="success" >{props.delivery.date}</Badge> </div>

                </Row>
            <hr></hr>
            
                <ListGroup>
                    {props.delivery.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
               
                {renderNote(props.delivery.note)}
                
                <hr></hr>
                <CardText> {props.delivery.buyerName}'s Phone number: {props.delivery.driverPhone}</CardText>
                <CardText> {props.delivery.buyerName}'s Address: {props.delivery.address1},  {props.delivery.address2},  {props.delivery.city} {props.delivery.zipcode}</CardText>


                

            </CardBody>

        </Card>
    );
}




class MyOrdersPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "requests"
        }
    }
    render() {

        return (
            <div className="container">
                <Nav tabs style = {{marginBottom:"20px", marginTop:"20px"}}>
                    <NavItem>
                        <NavLink
                            active={this.state.key === 'requests'}
                            onClick={() => { this.setState({ key: "requests" }) }}
                        >
                            My Requests
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={this.state.key === 'deliveries'}
                            onClick={() => { this.setState({ key: "deliveries" }) }}
                        >
                            My Deliveries
                        </NavLink>
                    </NavItem>
                </Nav>
                
                <TabContent activeTab={this.state.key}>
                    <TabPane tabId="requests">
                        <Row>
                            {
                                this.props.myrequests.map((request) => {
                                    return (
                                        <div key={request.id} className="col-md-6">
                                            <RenderRequestOrder request={request} />
                                        </div>
                                    );
                                })
                            }

                        </Row>
                    </TabPane>
                    <TabPane tabId="deliveries">
                        <Row >
                            {
                                this.props.mydeliveries.map((delivery) => {
                                    return (
                                        <div key={delivery.id} className="col-md-6">
                                            <RenderDeliveryOrder delivery={delivery} />
                                        </div>
                                    );
                                })
                            }
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );

    }

}


export default MyOrdersPage;