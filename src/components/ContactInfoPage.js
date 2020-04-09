import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Label, Input, Col, Row
} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);



class ContactInfoPage extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // this.props.resetFeedbackForm();

    }


    render() {

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-6 offset-md-2">
                        <h3>Fill Your Contact Information</h3>
                        <br></br>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3" >
                        <Form model="contactInfo" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={3} >Full Name</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Full name"
                                        className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phone" md={3}>Phone</Label>
                                <Col md={9} >
                                    <Control.text model=".phone" id="phone" name="phone"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".phone"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}>Email</Label>
                                <Col md={9}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="address1" md={3}>Address 1</Label>
                                <Col md={9}>

                                    <Control.text model=".address1" id="address1" name="address1"
                                        placeholder="Address 1"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5), maxLength: maxLength(30),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".address1"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            required: 'Required',
                                            minLength: 'Must be greater than 4 characters',
                                            maxLength: 'Must be 30 characters or less',
                                        }}
                                    />

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="address2" md={3}>Address 2</Label>
                                <Col md={9}>

                                    <Control.text model=".address2" id="address2" name="address2"
                                        placeholder="Address 2"
                                        className="form-control"

                                    />

                                </Col>
                            </Row>

                            <Row className="form-group">

                                <Label htmlFor="city" md={3}>City</Label>
                                <Col md={9}>


                                    <Control.text model=".city" id="city" name="city"
                                        placeholder="City"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}

                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".city"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />

                                </Col>

                            </Row>


                            <Row className="form-group">

                                <Label htmlFor="zipcode" md={3}>Zip code</Label>
                                <Col md={9}>


                                    <Control.text model=".zipcode" id="zipcode" name="zipcode"
                                        placeholder="Zip code"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}

                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".zipcode"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />

                                </Col>

                            </Row>

                            <Row className="form-group">
                                <Col sm = {{offset: 6}}>
                                    <Button type="submit" color="success">
                                        Complete!
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

export default ContactInfoPage;