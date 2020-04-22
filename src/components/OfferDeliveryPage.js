import React, { Component } from 'react';
import { Button, Label, Input, Col, Row, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { connect } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { auth } from '../firebase/firebase';
const mapStateToProps = state => {
    return {
        offerDeliveryForm: state.offerDeliveryForm,
       
    }
}
class OfferDeliveryPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        let now = new Date();
        now.setHours(12, 0, 0, 0);

        this.state = {
            // minDate: this.props.modalInfo.buyerDate.toDate(),
            minDate: new Date(),
            driverDate: this.props.offerDeliveryForm.driverDate? this.props.offerDeliveryForm.driverDate: now,
            anonymous: false,
        }

    }
    componentDidMount(){
        console.log("offer delivery user info", this.props.userInfo);
    }

    handleDateChange = date => {
        this.setState({
            driverDate: date
        })
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(this.state));
        if(!this.props.auth.isAuthenticated){
            this.props.toggleLogInModal();
            return;
        }

        let driverName = values.driverName;
        if(this.state.anonymous) driverName = "Anonymous";
        this.props.postNotification({
            content: "You have offered delivery to " + this.props.modalInfo.buyerName + " from " + this.props.modalInfo.store,
            orderId: this.props.modalInfo.id,
            userId: this.props.auth.user.uid//curr user id
        })
        this.props.postNotification({
            content: driverName + " offered delivery from " + this.props.modalInfo.store,
            orderId: this.props.modalInfo.id,
            userId: this.props.modalInfo.buyerId,
        })
        this.props.postUpdate({name: driverName, content: "Offered to deliver!" })
        this.props.updateOfferDelivery(
            {driverName: values.driverName, 
            driverId: this.props.auth.user.uid,
            driverPhone: values.driverPhone,
            driverDate: this.state.driverDate}, this.props.modalInfo.id);
    }

    toggleAnoymous = (e) => {
        this.setState({
            anonymous: !this.state.anonymous,
        })
    }


    render() {

        let updateNote = <Alert light> <b>{this.props.offerDeliveryForm.driverName}</b> offered delivery! </Alert>;
        if (this.state.anonymous) {
            updateNote = <Alert light> <b>Anonymous</b> offered delivery! </Alert>;
        }

        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} >
                <ModalHeader>Deliver to {this.props.modalInfo.buyerName} from {this.props.modalInfo.store}</ModalHeader>
                <ModalBody>
                    <Form model="offerDeliveryForm" onSubmit={(values) => this.handleSubmit(values)}>

                        <Row className="form-group">
                            <Label htmlFor="date" xs={6}>Choose delivery date </Label>
                            <Col xs={6}>
                                <DatePicker
                                    selected={this.state.driverDate}
                                    onChange={this.handleDateChange}
                                    dateFormat="MMMM d"
                                    isClearable={false}
                                    required
                                    className="form-control"
                                    minDate={this.state.minDate}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col xs={12}>
                                    <Label check>
                                        <strong>Contact Information: </strong>
                                    </Label>
                                    <div>*Your name and phone will only be shared with the recipient</div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="driverName" md={6}>  <strong>Contact Name</strong> </Label>

                                <Col xs={6}>
                                    <Control.input model=".driverName" id="driverName" name="driverName"
                                        className="form-control"                            
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="driverPhone" md={6}><strong>Contact Phone </strong></Label>
                                <Col xs={6}>
                                    <Control.input model=".driverPhone" id="driverPhone" name="driverPhone"
                                        // type = "tel"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                        <Row className="form-group">
                            <Col xs={12}>
                                <Label check>
                                    <strong>Please read the following guidelines:</strong>
                                </Label>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col xs={12}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox"
                                            className="form-check-input"
                                            required
                                        />
                I understand that this will be a contactless delivery.
            </Label>
                                </div>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col xs={12}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox"
                                            className="form-check-input"
                                            required
                                        />
                I acknowledge that my phone number and name will shared with the recipient.
            </Label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col xs={12}>
                                <Label check>
                                    <strong>The following update will be made public, do you want it to be anonymous? </strong>
                                </Label>
                            </Col>
                        </Row>
                        {updateNote}
                        <Row className="form-group">
                            <Col xs={12}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox"
                                            className="form-check-input"
                                            onClick={this.toggleAnoymous}
                                        />
                Yes, I want it to be anoymous.
            </Label>
                                </div>
                            </Col>
                        </Row>



                        <Row className="form-group">
                        </Row>

                        <Row className="form-group">
                        </Row>

                        <Row className="form-group justify-content-center">
                            <Col className="col-auto " >
                                <Button type="submit" color="success" className="btn-lg">
                                    <strong> Offer to deliver! </strong>
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                </ModalBody>

            </Modal>
        );
    }
}
export default connect(mapStateToProps)(OfferDeliveryPage);

