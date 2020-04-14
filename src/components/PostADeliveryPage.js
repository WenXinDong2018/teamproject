import React, { Component } from 'react';
import { Button, Label, Input, Col, Row } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { connect } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
const mapStateToProps = state => {
    return {
        deliveryPost: state.deliveryPost
    }
}

class PostADeliveryPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeErrand = this.changeErrand.bind(this);
        this.changeStore = this.changeStore.bind(this);
        this.state = {
            typeErrand: null,
            date: new Date(),
        }
        this.props.dispatch(actions.change("requestPost.date", this.state.date));

    }

    handleDateChange = date => {
        this.setState({
            date: date
        })
        this.props.dispatch(actions.change("deliveryPost.date", date));
    }

    handleSubmit(values) {
        // console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addDeliveryPost(values);
    }

    changeErrand = (e) => {
        this.setState({
            typeErrand: e.target.value
        })
        this.props.dispatch(actions.change("deliveryPost.typeErrand", e.target.value));
    }

    changeStore = (e) => {
        this.props.dispatch(actions.change("deliveryPost.store", e.target.value));

    }


    render() {

        let stores = <></>;
        if (this.state.typeErrand) {
            stores = this.props.nearbystores.filter((obj) => { return obj.type === this.state.typeErrand; })[0].stores.map((store) =>
                <option value={store}>{store}</option>
            )
        }
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h3>Fill out your shopping trip specifics </h3>
                        <br></br>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <Form model="deliveryPost" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="typeErrand" md={8}>What are you buying?</Label>
                                <Col md={4}>
                                    <select className="browser-default custom-select" onChange={this.changeErrand}
                                        required value={this.props.deliveryPost.typeErrand}>
                                        <option value=""></option>
                                        {this.props.nearbystores.map((obj) =>
                                            <option value={obj.type}>{obj.type}</option>

                                        )}
                                    </select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="store" md={8}>Which store are you going to?</Label>
                                <Col md={4}>
                                    <select className="browser-default custom-select" onChange={this.changeStore}
                                        required value={this.props.deliveryPost.store}>
                                        <option value=""></option>
                                        {stores}
                                    </select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor = "date" xs={6}>When are you going? </Label>
                                <Col xs={6}>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.handleDateChange}
                                        dateFormat="MMMM d"
                                        isClearable={false}
                                        required
                                        className="form-control"
                                        minDate={new Date()}
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
                                        <input type = "checkbox"
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
                                        <input type = "checkbox"
                                                className="form-check-input"
                                                required 
                                            />
                                            condition 2.
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
                                        <strong> Post Shopping Trip! </strong>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>


            </div>
        );
    }
}
export default connect(mapStateToProps)(PostADeliveryPage);