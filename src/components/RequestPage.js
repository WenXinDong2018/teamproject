import React, { Component } from 'react';
import { Alert, Label,Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Link } from "react-router-dom";
import {RenderRequestOrder} from "./RequestPageComponents";
import {Loading} from "./loadingComponent";
import { Button} from 'react-bootstrap';
import DatePicker from "react-datepicker"
import Moment from "react-moment"
import "react-datepicker/dist/react-datepicker.css";
import OfferDeliveryPage from "./OfferDeliveryPage";


class RequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            isLogInModalOpen: false,
            filters:{
                typeErrand: null,
                store: null,
                miles: "15",
                date: new Date(),
            },
            modalInfo: {
                modalOpen: false,
                id: null,
                buyerName: null, 
                buyerDate: null,
                store: null,
                buyerId: null,
            }
        }
        this.changeErrand = this.changeErrand.bind(this);
        this.changeStore = this.changeStore.bind(this);
        this.changeMiles = this.changeMiles.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleLogInModal = this.toggleLogInModal.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }


    handleGoogleLogin(event) {
        this.toggleLogInModal();
        this.props.googleLogin();
        event.preventDefault();
    }
    toggleLogInModal = () => {
        this.setState({
            isLogInModalOpen: !this.state.isLogInModalOpen
        });
    }

    toggleModal = (request) => {
        this.setState({
            modalInfo :{
                modalOpen: !this.state.modalInfo.modalOpen,
                id: request._id,
                buyerName: request.buyerName, 
                buyerDate: request.buyerDate,
                store: request.store,
                buyerId: request.buyerId,
            }
        })
    }

    changeDate = (e) => {
        this.setState({
            filters: {...this.state.filters,date: e}
        })
        this.props.filterRequests(this.state.filters)
    }
    changeMiles = (e) => {
        this.setState({
            filters: {...this.state.filters,miles: e.target.value,}
            
        })
        this.props.filterRequests(this.state.filters)
    }
    changeErrand = (e) => {
        // alert(e.target.value);

        this.setState({
            filters: {...this.state.filters,typeErrand: e.target.value,}
            
        })
        this.props.filterRequests(this.state.filters)
        // this.props.dispatch(actions.change("requestPost.typeErrand", e.target.value));
    }

    changeStore = (e) => {
        this.setState({
            filters: {...this.state.filters,store: e.target.value}
            
        })
        this.props.filterRequests(this.state.filters)
        // this.props.dispatch(actions.change("requestPost.store", e.target.value));
    }

    getData = () => {
        this.props.fetchUnmatchedRequests();
        this.props.fetchUpdates();        
    }
    
    componentDidMount(){
        // this.props.fetchUserInfo();
    }

    render() {

        let stores = <></>;
        if (this.state.filters.typeErrand) {
            stores = this.props.nearbystores.filter((obj) => { return obj.type === this.state.filters.typeErrand; })[0].stores.map((store) =>
                <option value={store}>{store}</option>
            )
        }
        let menu;
        
        if(this.props.isRequestsLoading) {
            menu = <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                    </div>
            
        }else{
            menu = this.props.requests.map((request) => {
                return (
                    <div key={request._id} className="col-12 col-md-6">
                        <RenderRequestOrder request={request} toggleModal = {this.toggleModal} />
                    </div>
    
                );
            });
        }
        
        const updates = this.props.updates.map((update) => {
            // console.log()
            return (
                <div key={update._id} className="col-12">
                    <Alert light> <b>{update.name}: </b>{update.content}  (<Moment fromNow>{update.createdAt.toDate()}</Moment>)</Alert>
                </div>
            );
        });


        const filters = <>
            <div className="row">
                <Col md={3}>
                    <select className="browser-default custom-select" onChange={this.changeErrand}
                        required value={this.state.filters.typeErrand}>
                        <option value="">Store Category</option>
                        <option data-divider="true"></option>

                        {this.props.nearbystores.map((obj) =>
                            <option value={obj.type}>{obj.type}</option>

                        )}
                    </select>
                </Col>
                <Col md={2}>
                    <select className="browser-default custom-select" onChange={this.changeStore}
                        required value={this.state.filters.store}>
                        <option value="">Store</option>
                        <option data-divider="true"></option>
                        {stores}
                    </select>
                </Col>
                <Col md={3}>
                    <select className="browser-default custom-select" onChange={this.changeMiles}
                        required value={this.state.filters.miles}>
                        <option value="15">Within 15 miles</option>
                        <option value="10">Within 10 miles</option>
                        <option value="5">Within 5 miles</option>
                    </select>
                </Col>
                <Col md={3}>
                    <Row>
                        <Label xs={5}>Need by:</Label>
                        <Col xs={7}>
                            <DatePicker

                                selected={this.state.filters.date}
                                onChange={this.changeDate}
                                dateFormat="MMMM d"
                                isClearable={false}
                                required
                                className="form-control"
                                minDate={new Date()}
                            />
                        </Col>
                    </Row>
                </Col>
            </div>

        </>

        return (
            <>

            <div className="container" >
            <div className="row" style = {{marginBottom:10}}><Col><b>Filter requests based on store, distance, and date:</b></Col></div>

                <div className="row">
                    <div className="col-md-11" style = {{marginBottom:5}}>
                        {filters}
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-11" style = {{marginBottom:5}}>
                        <strong >*Orange requests are from elderlies and immunocompromised.</strong>
                    </div>
                    
                </div>
                <br></br>
                <div className="row" >
                    <div className="col-12 col-md-10">
                        <div className="row" >
                            {menu}
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="row">
                            {updates}
                        </div>
                    </div>
                </div>
                
            </div>
            <Modal isOpen={this.state.isLogInModalOpen} toggle={this.toggleLogInModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                    </ModalBody>
            </Modal>

            <OfferDeliveryPage 
            postUserInfo = {this.props.postUserInfo}
            isModalOpen = {this.state.modalInfo.modalOpen} 
            toggleModal = {this.toggleModal} 
            modalInfo = {this.state.modalInfo}  
            updateOfferDelivery = {this.props.updateOfferDelivery} 
            postUpdate = {this.props.postUpdate} 
            postNotification = {this.props.postNotification} 
            auth = {this.props.auth} 
            toggleLogInModal = {this.toggleLogInModal}
            /> 
            <Link to = "/postARequest"><Button size = "lg" variant = "danger" style = {{right: 50, bottom: 50, position: 'fixed', zIndex: 10}}>Post A Request</Button></Link>
            </>
        );
    }


}


export default RequestPage;
