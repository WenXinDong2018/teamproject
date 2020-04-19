import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, CardSubtitle, CardHeader, CardFooter,
    Alert, ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import SendThankYouNote from "./SendThankYouNote"
import Moment from 'react-moment';

//component for rendering a single request

const payment = (venmo, cash) => {
    if(venmo === true && cash === true){
        return (<><CardText > Method(s) of Payment:  Venmo, Cash</CardText></>)
    }
    else if(venmo === true){
        return (<><CardText> Method(s) of Payment:  Venmo</CardText> </>)
    }
    else{
        return (<><CardText> Method(s) of Payment:  Cash </CardText></>)
    }
}

function renderNote(note){
    if(note === ""){
        return <></>
    }else{
        return (  <><br/><Alert light>Note to driver: {note}</Alert></>);
    }
}


function renderThankYouNote(note, user){
    if(note === ""){
        return <></>
    }else{
        return (  <><Alert color = "warning">Thank You Note from {user}: {note}</Alert></>);
    }
}
function renderDriverInfo(request, toggleModal, venmo, cash){
    if(request.driverName === "" || request.driverName === undefined){
        return payment(venmo, cash)

    }else{
        return(
            <>
            <hr></hr>
            <CardText>{request.driverName} is offering delivery.</CardText>
            <CardText> Contact Phone number: {request.driverPhone}</CardText>
            <CardText> {request.driverName} is delivering on <Moment format = "MMM DD">{request.driverDate}</Moment></CardText>
            {payment(venmo, cash)}
            <div className = "text-center"><Button color = "warning" onClick = {()=>toggleModal(request)}> Send a thank you note!</Button></div>
            </>
        );
    }
}



const RenderRequestOrder = (props) => {
    

    
    return (
        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: "green" }}>
           <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style = {{marginBottom:0}}> <b>Request placed <Moment fromNow>{props.request.createdAt}</Moment> </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{fontSize:"1rem"}} color="info" >{props.request.store}</Badge> , need before <Badge style ={{fontSize:"1rem"}} color="success" ><Moment format = "MMM DD">{props.request.buyerDate}</Moment></Badge> </div>

                </Row>
            <hr></hr>
            
                <ListGroup>
                    {props.request.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
               
                
                {renderNote(props.request.note)}
                {renderDriverInfo(props.request, props.toggleModal, props.request.venmo, props.request.cash)}
                

            </CardBody>

        </Card>
    );
}

const RenderDeliveryOrder = (props) => {
    return (

        <Card  style = {{marginBottom: "20px", border: "solid", borderColor: "green" }}>
           <CardBody>
                <Row >
                    <div class="col-auto mr-auto"><CardTitle style = {{marginBottom:0}}> <b>Deliverying to {props.delivery.buyerName} </b></CardTitle></div>
                    <div class="col-auto"><Badge style={{fontSize:"1rem"}} color="info" >{props.delivery.store}</Badge> , on <Badge style ={{fontSize:"1rem"}} color="success" ><Moment format = "MMM DD">{props.delivery.driverDate}</Moment></Badge> </div>

                </Row>
            <hr></hr>
            
                <ListGroup>
                    {props.delivery.shoppingList.map((shoppingItem) => {
                        return (
                            <ListGroupItem className="justify-content-between">
                                {shoppingItem.item} <Badge pill>{shoppingItem.quantity}</Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
               
                {renderNote(props.delivery.note)}
                
                <hr></hr>
                <CardText> {props.delivery.buyerName}'s Phone number: {props.delivery.driverPhone}</CardText>
                <CardText> {props.delivery.buyerName}'s Address: {props.delivery.address1},  {props.delivery.address2},  {props.delivery.city} {props.delivery.zipcode}</CardText>
                {payment(props.delivery.venmo, props.delivery.cash)}
                {renderThankYouNote(props.delivery.thankyounote, props.delivery.buyerName)}

                

            </CardBody>

        </Card>
    );
}




class MyOrdersPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "requests",
            modalInfo:{
                id: null,
                buyerName: null, 
                modalOpen: false,
                driverName:"",
            }
        }
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal = (request) => {
        this.setState({
            modalInfo :{
                modalOpen: !this.state.modalInfo.modalOpen,
                id: request.id,
                buyerName: request.buyerName, 
                driverName: request.driverName
            }
            
        })
    }
    componentDidMount(){
        console.log("my order's page", this.props.myrequests)
    }
    render() {

        return (
            <>
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
                                            <RenderRequestOrder request={request} toggleModal = {this.toggleModal}/>
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
            <SendThankYouNote isModalOpen = {this.state.modalInfo.modalOpen} toggleModal = {this.toggleModal} driverName = {this.state.modalInfo.driverName} /> 
            </>
        );

    }

}


export default MyOrdersPage;