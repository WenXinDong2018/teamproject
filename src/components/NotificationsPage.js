import React, {Component, useState} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Badge, Dropdown, 
    DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router-dom";

//component for rendering a single notification
const RenderNotification = (props) => {
    return(
        <Card body outline color = "success">
            
            <CardBody>
                <CardText>{props.notification.message_type}</CardText>
                <CardText>Order Number: {props.notification.order_id}</CardText>
                <CardText>Store: {props.notification.store}</CardText>
                <CardText>Courier: {props.notification.courier}</CardText>
                <CardText>
                    <small className = "text-muted">Last updated {props.notification.last_update} minutes ago</small>
                </CardText>
                <Button color = "success">View Details</Button>
            </CardBody>

        </Card>
    );
}

const RenderReadNotification = (props) => {
    return (
        <Card body outline color = "secondary">
            <CardBody>
                <CardText>{props.notification.message_type}</CardText>
                <CardText>Order Number: {props.notification.order_id}</CardText>
                <CardText>Store: {props.notification.store}</CardText>
                <CardText>Courier: {props.notification.courier}</CardText>
                <CardText>
                    <small className = "text-muted">Last updated {props.notification.last_update} minutes ago</small>
                </CardText>
                <Button color = "secondary">View Details</Button>
            </CardBody>
        </Card>
    );
}

const NotificationsPage = (props) =>{
    
        
        const unreadMenu = props.notifications.map((notification) => {
            return (
                <div key={notification.id} className="col-12 col-md-5 m-1">
                <RenderNotification notification = {notification} />
                </div>

            );
        });
    

        const readMenu = props.notifications.map((notification) => {
            return(
                <div key={notification.id} className = "col-12 col-md-5 m-1">
                <RenderReadNotification notification = {notification}/>
                </div>
            );
        });
        const [dropdownOpen, setDropdownOpen] = useState(false);
  
        const toggle = () => setDropdownOpen(prevState => !prevState);

        return (
            <div className = "container">
                <div className = "row-md">
                    <br></br>
                    <h1>Notifications <Badge color="success">4 Updates</Badge></h1>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            Filter
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem>Unread Notifications</DropdownItem>
                        <DropdownItem>Read Notifications</DropdownItem>
                        <DropdownItem>All Notifications</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <br></br>
                </div>
                <div>
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
                </div>

                <div className = "row">
                    {unreadMenu}
                </div>
                <div className = "row">
                    {readMenu}
                </div>
            </div>

        );
    }



export default NotificationsPage;