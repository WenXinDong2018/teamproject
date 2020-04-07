import React, {Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";

//component for rendering a single delivery
const RenderDeliveryOrder = (props) => {
    return(
        <Card >
                
                <CardTitle>{props.delivery.username}</CardTitle>
                
                <Link to ={`/requestDelivery/${props.delivery.id}`} >Request Delivery</Link>
        </Card>
    );
}
const CourierPage = (props) =>{
    

        const menu = props.deliveries.map((delivery) => {
            return (
                <div key={delivery.id} className="col-12 col-md-5 m-1">
                <RenderDeliveryOrder delivery = {delivery} />
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


export default CourierPage;