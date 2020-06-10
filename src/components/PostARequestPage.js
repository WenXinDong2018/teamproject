import React, { Component } from "react";
import {
  Button,
  Label,
  Input,
  Col,
  Row,
  ModalHeader,
  ModalBody,
  Modal,
} from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const MethodsOfPayment = [
  "Venmo",
  "Cash",
  "Check",
  "ApplePay",
  "Paypal",
  "Cash App",
  "Zelle",
  "Other",
];

const mapStateToProps = (state) => {
  return {
    requestPost: state.requestPost,
    userInfo: state.userInfo,
  };
};

class PostARequestPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeErrand = this.changeErrand.bind(this);
    this.changeStore = this.changeStore.bind(this);
    this.handleReplaceChange = this.handleReplaceChange.bind(this);
    this.handleShoppingItemNameChange = this.handleShoppingItemNameChange.bind(
      this
    );
    this.handleShoppingItemQuantityChange = this.handleShoppingItemQuantityChange.bind(
      this
    );
    this.handleNotShowChange = this.handleNotShowChange.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.toggleLogInModal = this.toggleLogInModal.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    let now = new Date();
    now.setHours(12, 0, 0, 0);

    this.state = {
      isLogInModalOpen: false,
      typeErrand: this.props.requestPost.typeErrand,
      otherStore: this.props.requestPost.otherStore,
      shoppingList: this.props.requestPost.shoppingList,
      buyerDate: this.props.requestPost.buyerDate
        ? this.props.requestPost.buyerDate
        : now,
    };
    if (!this.props.requestPost.buyerName) {
      this.props.dispatch(
        actions.change("requestPost.buyerName", this.props.userInfo.name)
      );
      this.props.dispatch(
        actions.change("requestPost.buyerPhone", this.props.userInfo.phone)
      );
      this.props.dispatch(
        actions.change("requestPost.address1", this.props.userInfo.address1)
      );
      this.props.dispatch(
        actions.change("requestPost.address2", this.props.userInfo.address2)
      );
      this.props.dispatch(
        actions.change("requestPost.city", this.props.userInfo.city)
      );
      this.props.dispatch(
        actions.change("requestPost.zipcode", this.props.userInfo.zipcode)
      );
      this.props.dispatch(
        actions.change("requestPost.buyerDate", this.state.buyerDate)
      );
    }
  }

  handleGoogleLogin(event) {
    this.toggleLogInModal();
    this.props.googleLogin();
    event.preventDefault();
  }
  handleFacebookLogin(event) {
    this.toggleLogInModal();
    this.props.facebookLogin();
    event.preventDefault();
  }
  toggleLogInModal = () => {
    this.setState({
      isLogInModalOpen: !this.state.isLogInModalOpen,
    });
  };
  handleDateChange = (date) => {
    date.setHours(12, 0, 0, 0);
    this.setState({
      buyerDate: date,
    });
    this.props.dispatch(actions.change("requestPost.buyerDate", date));
  };

  routeChange() {
    let path = "requestPage";
    this.props.history.push(path);
  }

  handleSubmit(values) {
    if (!this.props.auth.isAuthenticated) {
      this.toggleLogInModal();
      return;
    }
    if (!this.props.userInfo.name) {
      this.props.postUserInfo({
        name: values.buyerName,
        phone: values.buyerPhone,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        zipcode: values.zipcode,
      });
    }

    this.props.postRequest(
      { ...values, position: this.props.auth.position },
      this.state.shoppingList
    );
    this.routeChange();
  }

  changeErrand = (e) => {
    this.setState({
      typeErrand: e.target.value,
    });
    this.props.dispatch(
      actions.change("requestPost.typeErrand", e.target.value)
    );
  };

  changeStore = (e) => {
    
      this.props.dispatch(actions.change("requestPost.store", e.target.value));
  };
  addShoppingItem = () => {
    this.setState({
      shoppingList: this.state.shoppingList.concat({
        item: null,
        quantity: null,
      }),
    });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };

  removeShoppingItem = (idx) => () => {
    this.setState({
      shoppingList: this.state.shoppingList.filter((s, sidx) => idx !== sidx),
    });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };

  handleShoppingItemNameChange = (idx) => (e) => {
    const newShoppingList = this.state.shoppingList.map(
      (shoppingItem, sidx) => {
        if (idx !== sidx) return shoppingItem;
        return { ...shoppingItem, item: e.target.value };
      }
    );

    this.setState({ shoppingList: newShoppingList });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };

  handleShoppingItemQuantityChange = (idx) => (e) => {
    const newShoppingList = this.state.shoppingList.map(
      (shoppingItem, sidx) => {
        if (idx !== sidx) return shoppingItem;
        return { ...shoppingItem, quantity: e.target.value };
      }
    );

    this.setState({ shoppingList: newShoppingList });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };

  handleReplaceChange = (idx) => (e) => {
    const newShoppingList = this.state.shoppingList.map(
      (shoppingItem, sidx) => {
        if (idx !== sidx) return shoppingItem;
        return { ...shoppingItem, replace: e.target.checked };
      }
    );

    this.setState({ shoppingList: newShoppingList });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };

  handleNotShowChange = (idx) => (e) => {
    const newShoppingList = this.state.shoppingList.map(
      (shoppingItem, sidx) => {
        if (idx !== sidx) return shoppingItem;
        return { ...shoppingItem, notShow: e.target.checked };
      }
    );

    this.setState({ shoppingList: newShoppingList });
    this.props.dispatch(
      actions.change("requestPost.shoppingList", this.state.shoppingList)
    );
  };
  render() {
    let stores = <></>;
    if (this.state.typeErrand) {
      stores = this.props.nearbystores
        .filter((obj) => {
          return obj.type === this.state.typeErrand;
        })[0]
        .stores.map((store) => <option value={store}>{store}</option>);
    }
    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12 col-lg-6 col-md-10 offset-lg-3 offset-md-1">
            <h3>Fill in your request</h3>
            <br></br>
          </div>
          <div className="col-12 col-lg-6 col-md-10 offset-lg-3 offset-md-1">
            <Form
              model="requestPost"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="typeErrand" md={8}>
                  <strong>What do you need?</strong>
                </Label>
                <Col md={4}>
                  <select
                    className="browser-default custom-select"
                    onChange={this.changeErrand}
                    required
                    value={this.props.requestPost.typeErrand}
                  >
                    <option value=""></option>
                    {this.props.nearbystores.map((obj) => (
                      <option value={obj.type}>{obj.type}</option>
                    ))}
                  </select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="store" md={8}>
                  <strong>Which store do you need from?</strong>
                </Label>
                <Col md={4}>
                  <select
                    className="browser-default custom-select"
                    onChange={this.changeStore}
                    required
                    value={this.props.requestPost.store}
                  >
                    <option value=""></option>
                    {stores}
                  </select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="typeErrand" md={8}>
                  <strong>Please specify if you selected "Other":</strong>
                </Label>
                <Col md={4}>
                <Control.input
                    model=".otherstore"
                    id="otherstore"
                    name="otherstore"
                    type="text"           
                    required = {this.props.requestPost.store =="Other"}         
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" xs={6}>
                  <strong>I need before </strong>
                </Label>
                <Col xs={6}>
                  <DatePicker
                    selected={this.state.buyerDate}
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
              <Col >
                <Label htmlFor="message" >
               For each shopping item, click the checkbox if you want the courier to replace it with an alternative if unavailable.
                </Label>
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

                  <Col className="col-5 col-md-2">
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
                  <Col className="col-5 col-md-1">
                    <Label check>
                      <Input
                        checked={shoppingItem.replace}
                        onChange={this.handleReplaceChange(idx)}
                        type="checkbox"
                      />
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "0.8rem",
                          lineHeight: "1rem",
                        }}
                      >
                        Replace if n/a
                      </p>
                    </Label>
                  </Col>

                  
                  <Col className="col-2 col-md-2 ">
                    <Button
                      className="btn btn-danger pull-right"
                      id="removeItem"
                      onClick={this.removeShoppingItem(idx)}
                    >
                      <i className="fa fa-trash fa-lg"></i>
                    </Button>
                  </Col>

                  <div className = "col-auto">
                  
                    <Input
                    style = {{marginLeft:"0px", marginTop:"0.4rem"}}
                        checked={shoppingItem.notShow}
                        onChange={this.handleNotShowChange(idx)}
                        type="checkbox"
                      />
                 <Label style = {{marginLeft:"15px", fontSize: "0.8rem"
                     }}>
                      Don't show this item when displaying my offer, except to courier
                  </Label>
                  </div>
                </Row>
              ))}
              <Row className="form-group">
                <Col className="col-12">
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
                <Label htmlFor="price" xs={9}>
                  {" "}
                  <strong>
                    Please give an estimated total cost in full dollar $
                  </strong>
                </Label>

                <Col xs={3}>
                <Control.input
                    model=".price"
                    id="price"
                    name="price"
                    type="number"
                    step="1"
                    required
                    min={1}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="tip" xs={9}>
                  If possible, provide a courtesy tip to the driver $
                  
                </Label>

                <Col xs={3}>
                <Control.input
                    placeholder = {0}
                    model=".tip"
                    id="tip"
                    name="tip"
                    type="number"
                    step="1"
                    required
                    min={0}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <Control.textarea
                    model=".note"
                    id="note"
                    name="note"
                    rows="3"
                    className="form-control"
                    placeholder="Leave a note for the courier (optional)"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <Label check>
                    <strong>Method(s) of payment: </strong>
                  </Label>
                </Col>
              </Row>
              <Row className="form-group">
                {MethodsOfPayment.map((method) => (
                  <Col xs={4}>
                    <div className="form-check">
                      <Label check>
                        <Control.checkbox
                          model={"." + method}
                          name="agree"
                          className="form-check-input"
                        />
                        {method}
                      </Label>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <Label check>
                    <strong>Contact Information: </strong>
                  </Label>
                  <div>
                    *Your address1, address2, and phone number will only be
                    shared with the courier
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="buyerName" xs={6}>
                  {" "}
                  <strong>Contact Name</strong>{" "}
                </Label>

                <Col xs={6}>
                  <Control.input
                    model=".buyerName"
                    id="buyerName"
                    name="buyerName"
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="buyerPhone" xs={6}>
                  <strong>Contact Phone </strong>
                </Label>

                <Col xs={6}>
                  <Control.input
                    model=".buyerPhone"
                    id="buyerPhone"
                    name="buyerPhone"
                    type="tel"
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="address1" md={6}>
                  <strong>Address 1 </strong>
                </Label>

                <Col xs={12} md={6}>
                  <Control.input
                    model=".address1"
                    id="address1"
                    name="address1"
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="address2" md={6}>
                  <strong>Address 2 </strong>
                </Label>

                <Col xs={12} md={6}>
                  <Control.input
                    model=".address2"
                    id="address2"
                    name="address2"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="city" xs={2}>
                  <strong>City</strong>
                </Label>

                <Col xs={4}>
                  <Control.input
                    model=".city"
                    id="city"
                    name="city"
                    className="form-control"
                    required
                  />
                </Col>
                <Label htmlFor="zipcode" xs={2}>
                  <strong> Zipcode</strong>
                </Label>
                <Col xs={4}>
                  <Control.input
                    model=".zipcode"
                    id="zipcode"
                    name="zipcode"
                    className="form-control"
                    required
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
                      <input
                        type="checkbox"
                        className="form-check-input"
                        required
                      />
                      I have carefully read and agree to the <a href="/TOS" target="_blank">terms of services</a>{" "}
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <div className="form-check">
                    <Label check>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        required
                      />
                      I will do everything in my ability to ensure this is a
                      contactless delivery, or that my courier and I remain 6 ft
                      apart at all times.{" "}
                    </Label>
                  </div>
                </Col>
              </Row>

              <Row className="form-group">
                <Col xs={12}>
                  <div className="form-check">
                    <Label check>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        required
                      />
                      When I get an offer, I will reach out and work out a
                      payment method with my courier, which I will then fulfill.
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <div className="form-check">
                    <Label check>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        required
                      />
                      If I am purchasing alcohol, I am over 21 years of age.{" "}
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12}>
                  <Label check>
                    <strong>
                      Are you an elderly or immunocompromised (as defined{" "}
                      <a
                        href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-at-higher-risk.html?fbclid=IwAR3ujRPRK0FnTF8Yai1eILxYwX0g5EmWJqd21X-9QYsPSvdboC_Ft7ORgds"
                        target="_blank"
                      >
                        here
                      </a>
                      )?
                    </strong>
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="form-check">
                    <Label check style={{ marginBottom: "15px" }}>
                      <Control.checkbox
                        model=".priority"
                        name="priority"
                        className="form-check-input"
                      />
                      Yes, I am an elderly or immunocompromised.
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group"></Row>

              <Row className="form-group justify-content-center">
                <Col className="col-auto ">
                  {/* <NavLink to="/dashboard"> */}
                  <Button type="submit" color="success" className="btn-lg">
                    <strong> Post request </strong>
                  </Button>
                  {/* </NavLink> */}
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <Modal
          isOpen={this.state.isLogInModalOpen}
          toggle={this.toggleLogInModal}
        >
          <ModalHeader toggle={this.toggleLogInModal}>Login</ModalHeader>
          <ModalBody>
            <div className="text-center">
              <Button color="danger" onClick={this.handleGoogleLogin}>
                <span className="fa fa-google fa-lg"></span> Login with Google
              </Button>
            </div>
            <br></br>
            <div className="text-center">
              <Button color="info" onClick={this.handleFacebookLogin}>
                <span className="fa fa-facebook fa-lg"></span> Login with
                Facebook
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(PostARequestPage));
