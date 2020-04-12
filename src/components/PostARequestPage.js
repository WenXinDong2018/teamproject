import React, { Component } from 'react';
import {
    Button, Label, Input, Col, Row
} from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { connect } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

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
        this.changeStore = this.changeStore.bind(this);
        this.handleShoppingItemNameChange = this.handleShoppingItemNameChange.bind(this);
        this.handleShoppingItemQuantityChange = this.handleShoppingItemQuantityChange.bind(this);


        this.state = {
            typeErrand: null,
            shoppingList: [{ item: null, quantity: null }],
            date: new Date(),

        }
        this.props.dispatch(actions.change("requestPost.date", this.state.date));


    }

    handleDateChange = date => {
        this.setState({
            date: date
        })
        this.props.dispatch(actions.change("requestPost.date", date));
    }


    handleSubmit(values) {
        alert('Current shopping list is: ' + JSON.stringify(this.state.shoppingList));
        // this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));
        this.props.addRequestPost(values, this.state.shoppingList)
    }

    changeErrand = (e) => {
        // alert(e.target.value);

        this.setState({
            typeErrand: e.target.value
        })
        this.props.dispatch(actions.change("requestPost.typeErrand", e.target.value));
    }

    changeStore = (e) => {
        this.props.dispatch(actions.change("requestPost.store", e.target.value));

    }
    addShoppingItem = () => {
        this.setState({
            shoppingList: this.state.shoppingList.concat({ item: null, quantity: null }),

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

        const newShoppingList = this.state.shoppingList.map((shoppingItem, sidx) => {
            if (idx !== sidx) return shoppingItem;
            return { ...shoppingItem, item: e.target.value };
        });

        this.setState({ shoppingList: newShoppingList});
        this.props.dispatch(actions.change("requestPost.shoppingList", this.state.shoppingList));

    };

    handleShoppingItemQuantityChange = idx => (e) => {
        const newShoppingList = this.state.shoppingList.map((shoppingItem, sidx) => {
            if (idx !== sidx) return shoppingItem;
            return { ...shoppingItem, quantity: e.target.value };
        });

        this.setState({ shoppingList: newShoppingList });
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
                    <div className="col-12 col-md-6 offset-md-3">
                        <h3>Fill in your request</h3>
                        <br></br>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <Form model="requestPost" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="typeErrand" md={8}>What do you need?</Label>
                                <Col md={4}>

                                    <select className="browser-default custom-select" onChange={this.changeErrand}
                                        required value={this.props.requestPost.typeErrand}>
                                        <option value=""></option>
                                        {this.props.nearbystores.map((obj) =>
                                            <option value={obj.type}>{obj.type}</option>

                                        )}

                                    </select>

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="store" md={8}>Which store do you need from?</Label>
                                <Col md={4}>

                                    <select className="browser-default custom-select" onChange={this.changeStore}
                                        required value={this.props.requestPost.store}>
                                        <option value=""></option>
                                        {stores}
                                    </select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" xs={6}>I need before </Label>
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

                            {this.state.shoppingList.map((shoppingItem, idx) => (
                                <Row className="form-group">
                                    <Col md={7}>
                                        <Input
                                            placeholder={`Item #${idx + 1}`}
                                            value={shoppingItem.item}
                                            onChange={this.handleShoppingItemNameChange(idx)}
                                            required
                                        />

                                    </Col>

                                    <Col className="col-10 col-md-3" >
                                        <Input
                                            placeholder={`Qt`}
                                            value={shoppingItem.quantity}
                                            onChange={this.handleShoppingItemQuantityChange(idx)}
                                            type="number"
                                            min={1}
                                            max={100}
                                            required
                                        />
                                    </Col>
                                    <div></div>
                                    <Col className="col-2 col-md-2 " >
                                        <Button
                                            className="btn btn-danger pull-right"
                                            id="removeItem"
                                            onClick={this.removeShoppingItem(idx)}
                                        >
                                            <i className="fa fa-trash fa-lg"></i>

                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Row className="form-group">
                                <Col className="col-12" >
                                    <Button
                                        className="btn btn-info pull-right"
                                        id="addItem"
                                        onClick={this.addShoppingItem}

                                    >
                                        <i className="fa fa-plus fa-md"></i>
                            </Button>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="3"
                                        className="form-control" 
                                        placeholder = "Leave a note for the courier (optional)"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs = {12}>
                                <Label check>
                                    <strong>Please read the following guidelines:</strong>
                                </Label>
                                </Col>

                            </Row>

                            <Row className="form-group">
                                <Col xs = {12}>
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
                                <Col xs = {12}>
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
                                <Col xs = {12}>
                                <Label check>
                                    <strong>Are you an elderly or immunocompromised:</strong>
                                </Label>
                                </Col>

                            </Row>
                                <Row>
                                    
                                <Col xs = {12}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".priority" name="priority"
                                                className="form-check-input"
                                            />
                                            Yes, I am an elderly or immunocompromised.
                                        </Label>
                                    </div>
                                </Col>

                            </Row>
                            <Row className="form-group">
                                </Row>
                           
                            <Row className="form-group justify-content-center">
                                <Col className = "col-auto " >
                                    <Button type="submit" color="success" className = "btn-lg">
                                       <strong> Post request </strong>
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
export default connect(mapStateToProps)(PostARequestPage);