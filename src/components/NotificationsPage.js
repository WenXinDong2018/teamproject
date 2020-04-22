import React, { Component, useState } from 'react';
import { Media } from 'reactstrap';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Badge, Dropdown, FormGroup, Label, Input,
    DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import { Link } from "react-router-dom";
import Moment from "react-moment"
//component for rendering a single notification
const RenderNotification = (props) => {
    return (
        <Card body outline color={props.color}>

            <CardBody>
                <CardText>Order Number: {props.notification._id}</CardText>
                <CardText>{props.notification.content}</CardText>
                <CardText>
                    <small className="text-muted">Last updated <Moment fromNow >{props.notification.createdAt} </Moment></small>
                </CardText>
                <Button color={props.color}>View Details</Button>
            </CardBody>

        </Card>
    );
}

const unreadMenu = (notifications) => notifications.map((notification) => {
    if (notification.unread) {
        return (
            <div key={notification.id} className="col-12 col-md-5 m-1">
                <RenderNotification notification={notification} color="success" />
            </div>
        );
    }
});

const readMenu = (notifications) => notifications.map((notification) => {
    if (!notification.unread) {
        return (
            <div key={notification.id} className="col-12 col-md-5 m-1">
                <RenderNotification notification={notification} color="secondary" />
            </div>
        );
    }
});

class NotificationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unreadPostsLength: this.props.notifications.map((notification) => { if (notification.unread === true) { return notification; } }).length,
            unread: true,
            all: false,
            dropdownOpen: false,
        }
        this.handleChange = this.handleChange.bind(this)
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
                        {unreadMenu(this.props.notifications)}
                        {readMenu(this.props.notifications)}
                    </>)
            }
            if (this.state.unread) {
                return (
                    unreadMenu(this.props.notifications)
                )
            }
            return (
                readMenu(this.props.notifications)
            )
        }
        return (
            <div className="container">
                <Row>

                    <br></br>
                    <Col xs={8}>
                        <h3>Notifications <Badge color="success">{this.state.unreadPostsLength} Updates</Badge></h3>
                    </Col>

                </Row>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={() => this.handleChange({ unread: true, all: false })} />
                    <label class="form-check-label" for="inlineRadio1">Unread</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={() => this.handleChange({ unread: false, all: false })} />
                    <label class="form-check-label" for="inlineRadio2">Read</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" onClick={() => this.handleChange({ unread: true, all: true })} />
                    <label class="form-check-label" for="inlineRadio3">All</label>
                </div>
                <br></br>

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
                <Row>
                    {renderMenu()}
                </Row>
            </div>

        );
    }

}



export default NotificationsPage;