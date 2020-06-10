import React, { Component } from "react";
import CovidPhoto from "../img/covid.jpg";
import ContactlessDelivery from "../img/contactless_delivery.jpg";
import ThankyouBag from "../img/thankyoubag.jpg";
import WenXin from "../img/wenxin.jpg";
import Ella from "../img/Ella.jpg";
import Vincent from "../img/Vincent.jpg";
import Michelle from "../img/Michelle.png";
import Allison from "../img/Allison.jpg";
import Chris from "../img/Chris.jpg";
import George from "../img/George.jpg";
import Komala from "../img/Komala.jpg";
import Nuha from "../img/Nuha.jpg";
class MissionPage extends Component {
  render() {
    return (
      <div className="mission">
        <div>
          <div class="container ">
            <div class="row h-100 align-items-center">
              <div class="col-md-6">
                <h1 class="display-4">Our Mission</h1>
                <p
                  class="lead mb-0 text-justify"
                  style={{ marginRight: "5%", color:"black"}}
                >
                  {" "}
                  PonyExpress is a volunteer-based delivery service that seeks
                  to minimize trips to grocery stores, thereby promoting social
                  distancing efforts while ensuring access to essential
                  resources. Our service allows people to rely on others in
                  their community to deliver groceries, thus reducing risk of
                  infection.
                </p>
                <br></br>
              </div>
              <div class="col-md-6 col-12 ">
                <img
                  src={ContactlessDelivery}
                  alt="ourmission"
                  class="img-fluid"
                  style={{ height: "600px", width: "90%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div class="container ">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 d-s-none ">
                <img
                  src={CovidPhoto}
                  alt="ourmission"
                  class="img-fluid"
                  style={{
                    height: "600px",
                    width: "90%",
                  }}
                />
              </div>

              <div class="col-md-6 col-12">
                <h1 class="display-4">The Problems</h1>
                <p class="lead  mb-0 text-justify">
                  1. Grocery stores are a breeding ground for COVID-19
                  transmission.
                </p>
                <p class="lead mb-0 text-justify">
                  2. Grocery trips are becoming increasingly time-consuming due
                  to new restrictions on capacity limits.{" "}
                </p>
                <p class="lead mb-0 text-justify">
                  3. Shipping delays in online vendors are limiting at-risk
                  populations from getting essential supplies in a timely
                  manner.{" "}
                </p>
                <p class="lead mb-0 text-justify">
                  4. Delivery services such as Amazon Fresh, Instacart, and Uber
                  Eats require service fees and minimum purchase price.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div class="container ">
            <div class="row h-100 align-items-center">
              <div class="col-md-6">
                <h1 class="display-4">Our Solution</h1>
                <p
                  class="lead mb-0 text-justify"
                  style={{ marginRight: "5%" }}
                >
                  {" "}
                  PonyExpress helps community members coordinate shopping trips.
                  If you need something from a nearby store but are unable to go
                  yourself, post a request, and your neighbors will deliver to
                  you!
                </p>
                <br></br>
              </div>
              <div class="col-md-6 col-12 ">
                <img
                  src={ThankyouBag}
                  alt="ourmission"
                  class="img-fluid"
                  style={{ height: "600px", width: "90%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="container py-5">
          <div class="row mb-4">
            <div class="col-12">
              <h2 class="display-4 font-weight-light">Our Team</h2>
              <p class="font-italic ">
                We are a team of undergraduates at Stanford University and Cornell University
                passionate about helping others.
              </p>
            </div>
          </div>

          <div class="row text-center">
          <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Komala}
                  alt="Komala Anupindi"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Komala Anupindi</h5>
                <span class="small text-uppercase text-muted">
                  Healthcare Policy
                </span>{" "}
                <br></br>
                <span class="small text-muted">kra38@cornell.edu</span>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Vincent}
                  alt="WenXin Dong"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Vincent Chim</h5>
                <span class="small text-uppercase text-muted">
                  Chemistry
                </span>{" "}
                <br></br>
                <span class="small text-muted">vchim@stanford.edu</span>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={WenXin}
                  alt="WenXin Dong"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">WenXin Dong</h5>
                <span class="small text-uppercase text-muted">
                  Computer Science
                </span>{" "}
                <br></br>
                <span class="small text-muted">wxd@stanford.edu</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Chris}
                  alt="WenXin Dong"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Chris Kim</h5>
                <span class="small text-uppercase text-muted">
                  Physics
                </span>{" "}
                <br></br>
                <span class="small text-muted">chankyo@stanford.edu</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Nuha}
                  alt="Nuha Mohammed"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Nuha Mohammed</h5>
                <span class="small text-uppercase text-muted">
                  Computer Science
                </span>{" "}
                <br></br>
                <span class="small text-muted">nuha14m@gmail.com</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={George}
                  alt="WenXin Dong"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">George Nakayama</h5>
                <span class="small text-uppercase text-muted">
                  Mathematics
                </span>{" "}
                <br></br>
                <span class="small text-muted">w4756677@stanford.edu</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Michelle}
                  alt="Michelle Qin"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Michelle Qin</h5>
                <span class="small text-uppercase text-muted">
                  Computer Science
                </span>{" "}
                <br></br>
                <span class="small text-muted">mdqin@stanford.edu</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Ella}
                  alt="Ella Wang"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Ella Wang</h5>
                <span class="small text-uppercase text-muted">
                  BioEngineering
                </span>{" "}
                <br></br>
                <span class="small text-muted">ellawang@stanford.edu</span>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={Allison}
                  alt="WenXin Dong"
                  width="150"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Allison Zhang</h5>
                <span class="small text-uppercase text-muted">
                  Biology
                </span>{" "}
                <br></br>
                <span class="small text-muted">allisonzhang@stanford.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionPage;
