import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

//component for rendering a single request
const RenderRequestOrder = (props) => {
    return (

        <Card >
                 <h5 class="card-title">{props.request.username}</h5>
                 <CardText>{props.request.travel}</CardText>
                 <CardText>{props.request.category}</CardText>

                 <h5 class="card-title"> {"Requests:"} </h5>

                 <h5 class="card-title"> {"Store: "}{props.request.store} </h5>
                 <h5 class="card-title"> {"Deliver to: "}{props.request.zipcode} </h5>

                 <Button href={`/offertodeliver/${props.request.id}`} variant="success">  
                    Offer to Deliver
                </Button>

         </Card>

//<Link to ={`/offertodeliver/${props.request.id}`} >Offer to Deliver</Link>
    );
}
const RequestPage = (props) => {

    const menu = props.requests.map((request) => {
        return (
            <div key={request.id} className="col-12 col-md-5 m-1">
                <RenderRequestOrder request={request} />
            </div>

        );
    });

    return (
        <div className="container">

            <div className="row">
                {menu}
            </div>
        </div>

    );
}


export default RequestPage;