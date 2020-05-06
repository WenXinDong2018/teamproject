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
          <>
            (<Moment fromNow>{date}</Moment>)
          </>
        );
      }
      return <></>;
    };


    return (
      <div>


<section id="hero">
    <div class="hero-container">
      <h3>Welcome to <strong>PonyExpress</strong></h3>
      <h1>Delivery among neighbors</h1>
      <h2>A volunteer-based community delivery service</h2>
      <NavLink to="/requestPage" >
<a href="#about" class="btn-get-started scrollto">Request Delivery</a></NavLink>
     <br></br>
     <NavLink to="/requestPage" >
      <a href="#about" class="btn-get-started scrollto">Offer Delivery</a>
      </NavLink><br></br>
    </div>
  </section>
  <section id="about" class="about">
      <div class="container">

        <div class="section-title">
          <h2 >About</h2>
          <h3>Learn More <span style = {{color: "green"}}>About Us</span></h3>
          <p>PonyExpress is a volunteer-based platform that help connect neighbors to coordinate shopping trips.</p>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <ul>
              <li><i class="ri-check-double-line"></i> $0 service fee </li>
              <li><i class="ri-check-double-line"></i> No minimum purchase price</li>
              <li><i class="ri-check-double-line"></i> Order from any store around you</li>

            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p>
   If you need something from a nearby store but are unable to go yourself, post a request, and your neighbors will deliver to you!
            </p>
            <NavLink to = "/mission" ><a href="#" class="btn-learn-more">Learn More</a></NavLink>
          </div>
        </div>

      </div>
    </section>
    <section id="activities" class="about">
      <div class="container">

        <div class="section-title">
          <h2 >Nearby Updates</h2>
          <h3>Your neighbors' <span style = {{color: "green"}}>Recent Deliveries</span></h3>
        </div>
        </div>
</section>
    <section id="features" className="features">
      <div className="container">

        <div class="row">

{this.props.updates.slice(0, 28).map((update)=> 
        <div className="col-lg-3 col-md-4 col-6 col-6">
            <div className="icon-box">
              <p><strong>{update.name}:</strong> {update.content} {fromNow(update.createdAt)}</p>
            </div>
          </div>

)}
       
        </div>

      </div>
    </section>

    <section id="cta" class="cta">
      <div class="container">

        <div class="text-center">
          <h3>Call To Action</h3>
          <br/>
          <h4 >Planning to go on a shopping trip?
            Check out nearby requests and see if you can help!</h4>

          <p> Ending a pandemic is all about working together. The creators of
            PonyExpress want to promote social distancing by
            coordinating trips for essential items and groceries. More than a
            delivery service, this is a way for neighbors to connect,
            collaborate, and help each other. 
            
            </p>
        </div>

      </div>
    </section>

      </div>
    );
  }
}

export default indexPage;
