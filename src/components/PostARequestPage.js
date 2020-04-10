import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Label, Input, Col, Row, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown
} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import {connect} from "react-redux";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validQuantity = (val) => !isNaN(Number(val)) && val > 0;

const mapStateToProps = state => {
    return {
        requestPost: state.requestPost
    }
}


class PostARequestPage extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeErrand = this.changeErrand.bind(this);
        this.handleShoppingItemNameChange = this.handleShoppingItemNameChange.bind(this);
        this.handleShoppingItemQuantityChange = this.handleShoppingItemQuantityChange.bind(this);
        this.changeErrand = this.changeErrand.bind(this);


        this.state = {
            typeErrand: null,
            shoppingList: [],
            errors: []
        }

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        alert('Current ShoppingList is: ' + JSON.stringify(this.state.shoppingList));
    }

    changeErrand = (e) => {
        alert(e.target.value);
        this.setState({
            typeErrand: e.target.value
        })
        this.props.dispatch(actions.change("requestPost.typeErrand", e.target.value));

        // this.props.dispatch(actions.change(model, value));
                
    }

    addShoppingItem = () => {
        this.setState({
            shoppingList: this.state.shoppingList.concat({ item: null, quantity: null }),
            errors: this.state.errors.concat({ item: null, quantity: null })

        })
        this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));

    }

    removeShoppingItem = idx => () => {
        this.setState({
            shoppingList: this.state.shoppingList.filter((s, sidx) => idx !== sidx)
        });
        this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));

    };

    handleShoppingItemNameChange = idx => (e) => {
        let newErrors;
        if (!e.target.value) {
            newErrors = this.state.errors.map((error, sidx) => {
                if (idx !== sidx) return error;
                return { ...error, item: "Cannot be empty" };
            });
        } else {
            newErrors = this.state.errors.map((error, sidx) => {
                if (idx !== sidx) return error;
                return { ...error, item: "" };
            });
        }

        const newShoppingList = this.state.shoppingList.map((shoppingItem, sidx) => {
            if (idx !== sidx) return shoppingItem;
            return { ...shoppingItem, item: e.target.value };
        });

        this.setState({ shoppingList: newShoppingList, errors: newErrors });
        this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));

    };

    handleShoppingItemQuantityChange = idx => (e) => {

        let newErrors;
        if (isNaN(Number(e.target.value)) || e.target.value <= 0) {
            newErrors = this.state.errors.map((error, sidx) => {
                if (idx !== sidx) return error;
                return { ...error, quantity: "Cannot be zero" };
            });
        } else {
            newErrors = this.state.errors.map((error, sidx) => {
                if (idx !== sidx) return error;
                return { ...error, quantity: "" };
            });
        }
        const newShoppingList = this.state.shoppingList.map((shoppingItem, sidx) => {
            if (idx !== sidx) return shoppingItem;
            return { ...shoppingItem, quantity: e.target.value };
        });

        this.setState({ shoppingList: newShoppingList, errors: newErrors });
        this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));

    };

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
                    <div className="col-12">
                        <h3>Fill in your request</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="requestPost" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="typeErrand" md={2}>What do you need?</Label>
                                <Col md={10}>

<select className="browser-default custom-select" onChange = {this.changeErrand}>
  {this.props.nearbystores.map((obj) =>
    <option value = {obj.type}>{obj.type}</option>

)}
   
</select>

                                    
                                    <Control.select
                                        model=".typeErrand"
                                        id="typeErrand"
                                        name="typeErrand"
                                        validators={{ required }}
                                        changeAction={this.changeErrand}
                                        // component = {<select className="browser-default custom-select"/>}
                                    
                                    >   
                                        
                                        <option value=""></option>
                                        {this.props.nearbystores.map((obj) =>

                                            <option value={obj.type}>{obj.type}</option>

                                        )}
                                        

                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".typeErrand"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="store" md={2}>Which store do you need from?</Label>
                                <Col md={10}>

                                    <Control.select
                                        model=".store"
                                        id="store"
                                        name="store"
                                        validators={{ required }}
                                    >
                                        <option value=""></option>

                                        {stores}
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".store"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            {this.state.shoppingList.map((shoppingItem, idx) => (
                                <Row className="form-group">
                                    <Col md={6} >
                                        <Input
                                            placeholder={`Item #${idx + 1}`}
                                            value={shoppingItem.item}
                                            onChange={this.handleShoppingItemNameChange(idx)}
                                        />
                                        <span style={{ color: "red" }}>{this.state.errors[idx].item}</span>


                                    </Col>

                                    <Col md={2} >
                                        <Input
                                            placeholder={`Qt`}
                                            value={shoppingItem.quantity}
                                            onChange={this.handleShoppingItemQuantityChange(idx)}
                                        />
                                        <span style={{ color: "red" }}>{this.state.errors[idx].quantity}</span>


                                    </Col>
                                    <Col md={2} >
                                        <Button
                                            id="removeItem"
                                            onClick={this.removeShoppingItem(idx)}
                                        >
                                            -
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button
                                id="addItem"
                                onClick={this.addShoppingItem}

                            >
                                +
                            </Button>

                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                            />
                                            <strong>I understand that this will be a contactless delivery.</strong>
                                            <strong>I am not sick.</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                            />
                                            <strong>I am an elderly or immunocompromised</strong>
                                        </Label>
                                    </div>
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Leave a note for the courier</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(PostARequestPage);