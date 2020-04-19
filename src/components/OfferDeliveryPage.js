import React, { Component } from 'react';
import { Button, Label, Input, Col, Row, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { connect } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class OfferDeliveryPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            driverDate: new Date(),
            anonymous: false,

        }
    }

    handleDateChange = date => {
        this.setState({
            driverDate: date
        })
    }

    handleSubmit(values) {
        // console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(this.state));
        // this.props.addDeliveryPost(values);
    }

    toggleAnoymous = (e) => {
        this.setState({
            anonymous: !this.state.anonymous,
        })
    }


    render() {
        console.log(this.props.modalInfo.buyerDate);
        let updateNote = <Alert light> <b>{"WenXin"}</b> offered delivery! </Alert>;
        if (this.state.anonymous) {
            updateNote = <Alert light> <b>Anonymous</b> offered delivery! </Alert>;
        }

        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} >
                <ModalHeader>id: {this.props.modalInfo.id} Deliver to {this.props.modalInfo.buyerName} from {this.props.modalInfo.store}</ModalHeader>
                <ModalBody>
                    <Form model="offerDelivery" onSubmit={(values) => this.handleSubmit(values)}>

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
                                    minDate={this.props.modalInfo.buyerDate}
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
export default (OfferDeliveryPage);