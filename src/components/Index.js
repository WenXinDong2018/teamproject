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
        <div key={update._id} className="col-12">
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
          <div className="text-center">
            <Button size="lg" className="btn-block" variant="success">
              <strong>Sign Up for Free</strong>
            </Button>
          </div>
          <p
            style={{
              marginRight: "10%",
              marginLeft: "10%",
            }}
          >
            Ending a pandemic is all about working together. The creators of
            Pony Express want to help communities engage in social distancing by
            coordinating trips for essential items and groceries. More than a
            delivery service, this is a way for neighbors to connect and
            collaborate.
          </p>
        </div>

        <div className="container signUp">
          <h1>
            What to see the shopping trips going on around you? Want to spread
            warmth to your neighbors by offer delivery?{" "}
          </h1>
          <h1>
            Click to <a href="./Index.js">Sign UP</a>!
          </h1>
        </div>
        <div>{updates}</div>
        <div className="container learnMore">
          <h1>
            To learn more about current COVID-19 situation, click here to{" "}
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
              target="_blank"
            >
              Learn More
            </a>
            !
          </h1>
          <p>Stay Home, Stay Safe!</p>
        </div>
      </div>
    );
  }
}

export default indexPage;
