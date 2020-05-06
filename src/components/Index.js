import React, { Component } from "react";
import { Jumbotron, Alert, Button, Nav } from "reactstrap";
import Image from "react-bootstrap/Image";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";

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
        <section id="hero">
          <div class="hero-container">
            <h3>
              Welcome to <strong>PonyExpress</strong>
            </h3>
            <h1>Delivery among neighbors</h1>
            <h2>A volunteer-based community delivery service</h2>
            <NavLink to="/requestPage">
              <a href="#about" class="btn-get-started scrollto">
                Request Delivery
              </a>
            </NavLink>
            <br></br>
            <NavLink to="/requestPage">
              <a href="#about" class="btn-get-started scrollto">
                Offer Delivery
              </a>
            </NavLink>
            <br></br>
            {/* <NavLink to="/mission" >
      <a href="#about" class="btn-get-started scrollto">Learn More About Us</a>
      </NavLink> */}
          </div>
        </section>
        <section id="about" class="about">
          <div class="container">
            <div class="section-title">
              <h2 style={{ color: "green", backgroundColor: "#e6efdc" }}>
                About
              </h2>
              <h3>
                Learn More <span style={{ color: "green" }}>About Us</span>
              </h3>
              <p>
                PonyExpress is a volunteer-based platform that helps connect
                neighbors to coordinate shopping trips.
              </p>
            </div>

            <div class="row content">
              <div class="col-lg-6">
                <ul>
                  <li>
                    <i class="ri-check-double-line"></i> $0 service fee{" "}
                  </li>
                  <li>
                    <i class="ri-check-double-line"></i> Delivery is completely
                    voluntary and based on acts of kindness{" "}
                  </li>
                  <li>
                    <i class="ri-check-double-line"></i> No minimum purchase
                    price
                  </li>
                  <li>
                    <i class="ri-check-double-line"></i> Order from any store
                    around you
                  </li>
                </ul>
              </div>
              <div class="col-lg-6 pt-4 pt-lg-0">
                <p>
                  PonyExpress helps community members coordinate shopping trips.
                  If you need something from a nearby store but are unable to go
                  yourself, post a request, and your neighbors will deliver to
                  you!
                </p>
                <NavLink to="/mission">
                  <a href="#" class="btn-learn-more" style={{ color: "green" }}>
                    Learn More
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" class="cta">
          <div class="container">
            <div class="text-center">
              <h3 style={{ marginBottom: "2%" }}>Call To Action</h3>
              <p>
                {" "}
                Ending a pandemic is all about working together. The creators of
                PonyExpress want to promote social distancing by coordinating
                trips for essential items and groceries. More than a delivery
                service, this is a way for neighbors to connect, collaborate,
                and help each other.
              </p>
              <h5 style={{ color: "white" }}>
                Planning to go on a shopping trip? Check out nearby requests and
                see if you can help!
              </h5>
            </div>
          </div>
        </section>

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
            <strong>help.ponyexpress@gmail.com</strong>
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
