import React, { Component } from "react";
import {
  Alert,
  Label,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { RenderRequestOrder } from "./RequestPageComponents";
import { Loading } from "./loadingComponent";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import ScrollToTop from "react-scroll-up";
import "react-datepicker/dist/react-datepicker.css";
import OfferDeliveryPage from "./OfferDeliveryPage";
import { getDistance, convertDistance } from "geolib";

const MILES = 50;

class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      isLogInModalOpen: false,
      filters: {
        typeErrand: this.props.filters.typeErrand,
        store: this.props.filters.store,
        miles: this.props.filters.miles,
        date: this.props.filters.date,
      },
      modalInfo: {
        modalOpen: false,
        id: null,
        buyerName: null,
        buyerDate: null,
        store: null,
        buyerId: null,
      },
    };
    this.changeErrand = this.changeErrand.bind(this);
    this.changeStore = this.changeStore.bind(this);
    this.changeMiles = this.changeMiles.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleLogInModal = this.toggleLogInModal.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleFacebookLogin(event) {
    this.toggleLogInModal();
    this.props.facebookLogin();
    event.preventDefault();
  }

  handleGoogleLogin(event) {
    this.toggleLogInModal();
    this.props.googleLogin();
    event.preventDefault();
  }
  toggleLogInModal = () => {
    this.setState({
      isLogInModalOpen: !this.state.isLogInModalOpen,
    });
  };

  toggleModal = (request) => {
    this.setState({
      modalInfo: {
        modalOpen: !this.state.modalInfo.modalOpen,
        id: request._id,
        buyerName: request.buyerName,
        buyerDate: request.buyerDate,
        store: request.store,
        buyerId: request.buyerId,
      },
    });
  };

  addOneDay = ()=> {
    let nextDay = this.state.filters.date;
    nextDay.setDate(this.state.filters.date.getDate()+1);
    this.setState({
      filters:{
        ...this.state.filters, date: nextDay,
      }
    })
  }

  minusOneDay = ()=> {
    let today = new Date();
    if(this.state.filters.date.getDate() == today.getDate()){
      return;
    }
    let prevDay = this.state.filters.date;
    prevDay.setDate(this.state.filters.date.getDate()-1);
    this.setState({
      filters:{
        ...this.state.filters, date: prevDay,
      }
    })
  }
  
  changeDate = (e) => {
    this.setState({
      filters: { ...this.state.filters, date: e },
    });
    this.props.setFilters({ ...this.state.filters, date: e });
  };
  changeMiles = (e) => {
    if (!e.target.value) e.target.value = MILES;
    this.setState({
      filters: { ...this.state.filters, miles: e.target.value },
    });
    this.props.setFilters({ ...this.state.filters, miles: e.target.value });
  };
  changeErrand = (e) => {
    // alert(e.target.value);

    this.setState({
      filters: { ...this.state.filters, typeErrand: e.target.value, store: null },
    });
    this.props.setFilters({
      ...this.state.filters,
      typeErrand: e.target.value,
      store: null
    });
  };

  changeStore = (e) => {
    this.setState({
      filters: { ...this.state.filters, store: e.target.value },
    });
    this.props.setFilters({ ...this.state.filters, store: e.target.value });
  };

  render() {
    let stores = <></>;
    if (this.state.filters.typeErrand) {
      stores = this.props.nearbystores
        .filter((obj) => {
          return obj.type === this.state.filters.typeErrand;
        })[0]
        .stores.map((store) => <option value={store}>{store}</option>);
    }
    let menu;

    if (this.props.isRequestsLoading) {
      menu = (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else {
      menu = this.props.requests.map((request) => {
        // console.log("checking!", request.buyerDate, this.state.filters.date)
        if (request.buyerDate.toDate() >= this.state.filters.date) {
          //   console.log("request passed through filter")
          if (
            !this.state.filters.typeErrand ||
            this.state.filters.typeErrand === request.typeErrand
          ) {
            if (
              !this.state.filters.store ||
              this.state.filters.store === request.store
            ) {
              if (!this.state.filters.miles || !this.props.auth.position) {
                return (
                  <div key={request._id} className="col-12 col-md-6">
                    <RenderRequestOrder
                      request={request}
                      toggleModal={this.toggleModal}
                    />
                  </div>
                );
              } else {
                let distance = 0;
                if(!request.position){
                  // console.log("request.position not found", request._id);
                  
                }else{
                  let distance = getDistance(
                    {
                      latitude: request.position.lat,
                      longitude: request.position.lng,
                    },
                    {
                      latitude: this.props.auth.position.lat,
                      longitude: this.props.auth.position.lng,
                    }
                  );
                  distance = convertDistance(distance, "mi");
                }

          
                if (distance < this.state.filters.miles) {
                  // console.log("distance = ", distance);
                  return (
                    <div key={request._id} className="col-12 col-md-6">
                      <RenderRequestOrder
                        request={request}
                        toggleModal={this.toggleModal}
                      />
                    </div>
                  );
                }
              }
            }
          }
        }
      });
    }

    const fromNow = (date) => {
      if (date) {
        date = date.toDate();
        return (
          <div>
            (<Moment fromNow>{date}</Moment>)
          </div>
        );
      }
      return <></>;
    };
    const updates = this.props.updates.map((update) => {
      return (
        <div key={update._id} className="col-12">
          <Alert light>
            {" "}
            <b>{update.name}: </b>
            {update.content} {fromNow(update.createdAt)}
          </Alert>
        </div>
      );
    });

    const filters = (
      <>
        <div className="row">
        <div className="col-md-10">
          <div className="row">
          <Col xs = {12}>
              <div className = "marginBottom5"><b>Are you looking to deliver? Filter requests based on store, distance, and date:</b> </div>
            </Col>

          <Col lg={3} md={4}>
            <select
              className="browser-default custom-select"
              onChange={this.changeErrand}
              required
              value={this.state.filters.typeErrand}
            >
              <option value="">Store Category</option>
              {/* <option data-divider="true"></option> */}

              {this.props.nearbystores.map((obj) => (
                <option value={obj.type}>{obj.type}</option>
              ))}
            </select>
          </Col>
          <Col lg={3} md={4}>
            <select
              className="browser-default custom-select"
              onChange={this.changeStore}
              required
              value={this.state.filters.store}
            >
              <option value="">Store</option>
              {/* <option data-divider="true"></option> */}
              {stores}
            </select>
          </Col>
          <Col lg={4} md={4}>
            <select
              className="browser-default custom-select"
              onChange={this.changeMiles}
              required
              value={this.state.filters.miles}
            >
              <option value="">Within Distance</option>
              {/* <option data-divider="true"></option> */}
              <option value="15">Within 15 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="5">Within 5 miles</option>
            </select>
          </Col>
          <div className="col-12 marginTop5">
             
                (Orange requests are from the elderly or immunocompromised.)
             
          </div>
          </div>
          </div>

          <Col lg={2} s={12}>
            <Row>
            <Col xs = {12} md = {6} lg = {12}>
            <div className = "marginBottom5"> <b>Need a delivery? </b></div>
            </Col>
            <Col xs = {12} md = {6} lg = {12}>
            <Link to="/postARequest">
              <div className="text-center" >
                <Button size="lg" className="btn-block" variant="success">
                  <strong> Post A Request</strong>
                </Button>
              </div>
            </Link>
            </Col>
            </Row>
          </Col>
          
        </div>
      </>
    );

    const calendarStrings = {
      sameDay : '[Today]',
      nextDay : '[Tomorrow]',
      nextWeek : 'dddd',
      sameElse : 'L'
  };

  const calendar = <>
  <div className="col-12 col-md-8">
  <h4>Requests needed before the end of <span style = {{textDecoration:"underline", display: "inline-block"}}><Moment calendar = {calendarStrings}>{this.state.filters.date.toString()}</Moment></span></h4>
  </div>

  
  <div className=" col-12  col-md-4">
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-light" style = {{marginRight: "5px"}} onClick = {this.minusOneDay}><span className="fa fa-angle-left"></span></button>
    <DatePicker
          selected={this.state.filters.date}
          onChange={this.changeDate}
          dateFormat="MMMM d"
          isClearable={false}
          required
          className="form-control"
          minDate={new Date()}
        />
    <button type="button" class="btn btn-light "style = {{marginLeft: "5px"}} onClick = {this.addOneDay}><span className="fa fa-angle-right"></span></button>
  </div>
  </div>
  </>

  
    return (
      <>
        <div className="container">
          <br></br>


          <div className="row">
            <div className="col-md-12">
              {filters}
            </div>
          </div>
      <br></br>
          <div className="row">
            <div className="col-12 col-lg-10">
              <div className ="row">{calendar}</div>
              <br></br>
              <div className="row">{menu}</div>
            </div>
            <div className="col-12 col-lg-2">
              <div
                className="row "
                style={{ maxHeight: window.innerHeight, overflowY: "scroll" }}
              >
                {updates}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-md-2 offset-md-5 offset-4">
              <ScrollToTop
                showUnder={160}
                style={{ right: "auto", zIndex: 100 }}
              >
                <Button variant="secondary" style={{ borderRadius: "15px" }}>
                  Back to top
                </Button>
              </ScrollToTop>
            </div>
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

        <OfferDeliveryPage
          postUserInfo={this.props.postUserInfo}
          isModalOpen={this.state.modalInfo.modalOpen}
          toggleModal={this.toggleModal}
          modalInfo={this.state.modalInfo}
          updateOfferDelivery={this.props.updateOfferDelivery}
          postUpdate={this.props.postUpdate}
          postNotification={this.props.postNotification}
          auth={this.props.auth}
          toggleLogInModal={this.toggleLogInModal}
          buyerDate={this.state.modalInfo.buyerDate}
        />
      </>
    );
  }
}

export default RequestPage;
