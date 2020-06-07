import React, { Component } from 'react';
import { Jumbotron, Button, CardHeader, Card, CardBody } from 'reactstrap';
import { QA } from "../shared/qa";



class QAPage extends Component {

    render() {
        return (
            
            <div className="container">
                <br></br>
                <div class="row">
                    <div class="col-lg-9 mx-auto">
                <div class="accordion" id="accordionExample">

                
                            {QA.map((qa, key) => {
                                return (
                                    <>
                                    <div class="card">
                                        <div id={key+"h"} data-toggle="collapse" data-target={"#"+key+"c"} aria-expanded="false" aria-controls={key+"c"} 
                                        class="card-header bg-white">
                                            
                                            <h6 class="mb-0 font-weight-bold" style = {{padding: "2px"}}>{qa.question} <i class="fa fa-plus more-less"></i></h6>
                                            
                                        </div>
                                        <div id={key+"c"} aria-labelledby={key+"h"} data-parent="#accordionExample" class="collapse">
                                            
                                        
                                        <div class="card-body p-5">
                                        <p class="font-weight-light m-0">{qa.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    </>
                                    
                                        )
                            }
                        )}

                </div>
</div>
            </div>

<br/>
         </div>
        );
    }



}

export default QAPage;


