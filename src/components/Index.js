import React, { Component } from "react";
import { Jumbotron, Alert, Button } from "reactstrap";
import Image from "react-bootstrap/Image";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class indexPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
        <div key={update._id} className="row-12">
          <Alert light>
            {" "}
            <b>{update.name}: </b>
            {update.content} {fromNow(update.createdAt)}
          </Alert>
        </div>
      );
    });

    return (
      <div>
        <div className="row-header">
          <div className="inner col-7">
            <div className="row">
              <Image src={require("../img/logo.png")} fluid />
            </div>
            <div className="row title">
              <div className="col-12">
                <h1>Get your essentials on Pony Express</h1>
                <p>Faster. Safer. Kinder.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-paragraph">
          <p
            style={{
              marginRight: "10%",
              marginLeft: "10%",
            }}
          >
            Ending a pandemic is all about working together. The creators of
            Pony Express want to help communities engage in social distancing by
            coordinating trips for essential items and groceries. More than a
            delivery service, this is a way for neighbors to connect,
            collaborate, and help each other.
          </p>
        </div>

        <div className="container-btn">
          <div className="text-center">
            <Button size="lg" className="btn" color="success">
              <strong style={{ fontSize: "125%" }}>Sign Up for Free</strong>
            </Button>
          </div>
        </div>

        <div className="container-video">
          <h1 class="section-title">How it works</h1>
          <p class="section-text">
            We've made it easy to post a request and offer a delivery.
          </p>
        </div>

        <div className="container-activity">
          <h1 class="section-title">Recent activity</h1>
          <p class="section-text">
            Check out the requests and deliveries being made around your area!
          </p>

          <div class="scrollmenu">
            <div
              className="row"
              style={{
                overflowY: "none",
                overflowX: "scroll",
                maxHeight: "200px",
              }}
            >
              {updates}
            </div>
          </div>
        </div>

        <div className="container learnMore">
          <p className="section-text" style={{ marginTop: "2%" }}>
            Contact the Pony Express team at{" "}
            <strong>ponyexpress@info.com</strong>
            <br></br>
            To learn more about the current COVID-19 situation,{" "}
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
              target="_blank"
            >
              click here
            </a>
            .<br></br>
            <p style={{ fontSize: "medium" }}>Stay Home, Stay Safe!</p>
          </p>
        </div>
      </div>
    );
  }
}

export default indexPage;
