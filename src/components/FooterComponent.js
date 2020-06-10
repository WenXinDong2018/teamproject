import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-md-6 footer-contact">
              <h4>PonyExpress</h4>
              <span>
                help.ponyexpress@gmail.com
              </span>
              <a
                href="https://twitter.com/PonyExps"
                target="_blank"
                className="fa fa-twitter fa-lg"
              ></a>
              <a
                href="https://www.instagram.com/ponyexps/"
                target="_blank"
                className="fa fa-instagram fa-lg"
              ></a>
            </div>

            <div class="col-md-2 col-4 footer-links">
              <ul>
                <li>
                  <i class="fa fa-angle-right"></i>{" "}
                  <NavLink to="/index">
                    <a href="#">Home</a>
                  </NavLink>
                </li>
                <li>
                <i class="fa fa-angle-right"></i>{" "}
                  <NavLink to="/requestPage">
                    <a href="#">Requests</a>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div class="col-md-2 col-4 footer-links">
              <ul>
                <li>
                <i class="fa fa-angle-right"></i>{" "}
                  <NavLink to="/mission">
                    <a href="#">About us</a>
                  </NavLink>
                </li>
                <li>
                <i class="fa fa-angle-right"></i>{" "}
                  <NavLink to="/faq">
                    {" "}
                    <a href="#">FAQ</a>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div class="col-md-2 col-4 footer-links">
              <ul>
                <li>
                <i class="fa fa-angle-right"></i>{" "}
                  <NavLink to="/tos">
                    {" "}
                    <a href="#">Terms of service</a>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <div class="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>PonyExpress</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
