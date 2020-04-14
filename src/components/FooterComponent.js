import React from 'react';
import {Link} from 'react-router-dom';
function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                
                <div className="col-12 col-sm-12 text-align-center">
                    <h5>Our Mission</h5>
                    <p> Pony Express is a volunteer-based delivery service that seeks to condense trips to grocery stores, 
                        thereby promoting social distancing efforts while ensuring access to essential resources. 
                        Our service allows people to rely on others in their community to deliver groceries, 
                        thus reducing risk of infection. </p>
                    
                </div>

            </div>

        </div>
    </div>
    )
}

export default Footer;