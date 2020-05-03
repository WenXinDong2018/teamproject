import React, { Component } from 'react';
import { Jumbotron, Button, CardHeader, Card, CardBody } from 'reactstrap';
import { QA } from "../shared/qa";

class QAPage extends Component {

    render() {
        return (
            <div className="container">
                <div class="row">
                    <div class="col-lg-9 mx-auto">
                            {QA.map((qa, key) => {
                                return (
                                    <>
                                    <div class="card shadow">
                                        <div id={key+"h"} class="card-header bg-white shadow-sm border-0">
                                            <h6 class="mb-0 font-weight-bold" style = {{padding: "2px"}}>{qa.question} </h6>
                                        </div>
                                        <div id={key+"c"} aria-labelledby={key+"h"} data-parent="#accordionExample" class="collapse show">
                                            <div class="card-body p-5">
                                <p class="font-weight-light m-0">{qa.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    </>
                                    
                                        )
                            }
                        )}

                </div>

            </div>

         </div>
        );
    }



}

export default QAPage;


