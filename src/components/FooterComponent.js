import React from 'react';
import {Link} from 'react-router-dom';
import { NavLink } from "react-router-dom";

function Footer(props) {
    return(
        <footer id="footer">

        <div class="footer-top">
          <div class="container">
            <div class="row">
        
              <div class="col-md-6 footer-contact">
                <h4>PonyExpress</h4>
                <p>
                <strong>Twitter:</strong> PonyXpsStanford<br/>
                <strong>Email:</strong> help.ponyexpress@gmail.com
                </p>
              </div>
        
        
              <div class="col-md-2 footer-links">
                <ul>
                  <li><i class="bx bx-chevron-right"></i> <NavLink to="/index" ><a href="#">Home</a></NavLink></li>
                  <li><i class="bx bx-chevron-right"></i> <NavLink to="/requestPage" ><a href="#">Requests</a></NavLink></li>
        
                </ul>
              </div>
              
              <div class="col-md-2 footer-links">
                <ul>
                  <li><i class="bx bx-chevron-right"></i> <NavLink to="/mission" ><a href="#">About us</a></NavLink></li>
                  <li><i class="bx bx-chevron-right"></i><NavLink to="/qa" > <a href="#">FAQ</a></NavLink></li>
        
                </ul>
              </div>
            
              <div class="col-md-2 footer-links">
                <ul>
                  <li><i class="bx bx-chevron-right"></i> <NavLink to="/tos" > <a href="#">Terms of service</a></NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
          <div class="text-center">
            <div class="copyright">
              &copy; Copyright <strong><span>PonyExpress</span></strong>. All Rights Reserved
            </div>
          </div>
        </footer>
    )
}

export default Footer;