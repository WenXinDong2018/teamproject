import React, {Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";

//component for rendering a single request
const RenderRequestOrder = (props) => {
    return(
        <Card >
                
                <CardTitle>{props.request.username}</CardTitle>
                
                <Link to ={`/offertodeliver/${props.request.id}`} >Offer to Deliver</Link>
        </Card>
    );
}

const RequestPage = (props) =>{
    

        const menu = props.requests.map((request) => {
            return (
                <div key={request.id} className="col-12 col-md-5 m-1">
                <RenderRequestOrder request = {request} />
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


export default RequestPage;