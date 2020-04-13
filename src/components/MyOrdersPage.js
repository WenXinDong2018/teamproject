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
const RenderRequestOrder = (props) => {
    return (
        <Card style = {{marginBottom: "20px"}}>
            <CardHeader>
                <Row>
                    <div class="col-auto mr-auto"><CardTitle> Request placed </CardTitle></div>
                    <div class="col-auto"><CardTitle> {props.request.store}, on {props.request.date} </CardTitle></div>
                </Row>
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {props.request.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>

            </CardBody>
                <CardFooter className="text-muted">Created on {props.request.createdAt}</CardFooter>

        </Card>
    );
}

const RenderDeliveryOrder = (props) => {
    return (

        <Card style = {{marginBottom: "20px"}}>
            <CardHeader>
                <Row>
                    <div class="col-auto mr-auto"><CardTitle> Shopping Trip Posted </CardTitle></div>
                    <div class="col-auto"><CardTitle> {props.delivery.store}, on {props.delivery.date} </CardTitle></div>
                </Row>

            </CardHeader>
            <CardBody>


                <ListGroup>

                    {props.delivery.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>

                            </ListGroupItem>

                        );
                    })}
                </ListGroup>

            </CardBody>
                <CardFooter className="text-muted">Created on {props.delivery.createdAt}</CardFooter>

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