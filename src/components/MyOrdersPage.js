import React, {Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";

//component for rendering a single order
const RenderOrder = (props) => {
    return(
        <Card >
                
                <CardTitle>{props.order.username}</CardTitle>
                
        </Card>
    );
}
const MyOrdersPage = (props) =>{
    

        const menu = props.myorders.map((order) => {
            return (
                <div key={order.id} className="col-12 col-md-5 m-1">
                <RenderOrder order = {order} />
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


export default MyOrdersPage;