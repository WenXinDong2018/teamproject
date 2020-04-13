import React, {Component, Fragment} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";
import { Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

//component for rendering a single delivery
const RenderDeliveryOrder = (props) => {
    return(
        <Fragment>

        <Card style={{padding: "15px 15px", border: "solid", borderColor:"green", width:"95%"}}>

                <div class="div1">
                    <img class="img" src={ require('/Users/michelleqin/Documents/GitHub/teamproject/src/components/dog.jpg') }/>
                    <div class="div2">
                        <b><p style={{paddingLeft: "15px", fontSize:"25px", fontWeight: "bold", display: "inline"}}>{props.delivery.username}</p></b>
                        <CardText style={{paddingLeft: "15px", fontSize:"15px"}}>{props.delivery.zipcode}</CardText>
                    </div>
                </div>

                <div id="info" style={{paddingTop:"20px"}}>
                <CardText>{<strong>Going to: </strong>} {props.delivery.store}</CardText>
                <CardText>{<strong>Date: </strong>} {props.delivery.date}</CardText>
                <CardText>{<strong>Willing to deliver to: </strong>} </CardText>
                </div>

                <div className = "col - 12 col-sm-6">
                    <p>{props.delivery.zipcode}</p>
                </div>

                <hr />
                <Button id = "delBtn" style={{width: '250px', margin: "0 auto"}} href={`/requesttodeliver/${props.delivery.id}`} variant="success">  
                    Request Delivery        
                </Button>
        </Card>
        </Fragment>
    );
}
const CourierPage = (props) =>{
    

        const menu = props.deliveries.map((delivery) => {
            return (

                <div key={delivery.id} className="col-md-4 col-md-4 col-md-4" style= {{padding: 10}}>
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