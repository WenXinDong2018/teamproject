import React, {Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import {Link} from "react-router-dom";

//component for rendering a single notification
const RenderNotification = (props) => {
    return(
        <Card >
                
            <CardTitle>#{props.notification.order_id}</CardTitle>
            <Button>View details</Button>
        </Card>
    );
}
const NotificationsPage = (props) =>{
    

        const menu = props.notifications.map((notification) => {
            return (
                <div key={notification.id} className="col-12 col-md-10 m-1">
                <RenderNotification notification = {notification} />
                </div>

            );
        });

        return (
            <div className = "container">
                
                <div className = "row">
                    {menu}
                </div>
            </div>

        );
    }


export default NotificationsPage;