import React, {Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Badge} from 'reactstrap';
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
class NotificationsPage extends Component{
    
    constructor(props){
        super(props);

    }
    getData = () => {
        this.props.fetchNotifications();
    }
    
    componentDidMount(){
        this.intervalID = setInterval(this.getData.bind(this), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
    }
    render(){
        const menu = this.props.notifications.map((notification) => {
            return (
                <div key={notification.id} className="col-12 col-md-6 m-1">
                <RenderNotification notification = {notification} />
                
                </div>

            );
        });
    

        return (
            <div className = "container">
                <div className = "row-md">
                    <br></br>
                    <h1>Notifications <Badge color="success">4 Updates</Badge></h1>
                    <Button outline color="secondary">See Read Messages</Button>
                    <br></br>
                    <br></br>
                </div>
                <div className = "row">
                    {menu}
                    
                </div>
            </div>

        );
    }
}


export default NotificationsPage;