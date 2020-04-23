import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Alert , Form, Input, Row, Col, Label, Button} from 'reactstrap';

class SendThankYouNote extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            content: "Thank you for delivering!",
            anonymous: false,
        }
    }

    handleChange(event) {
        this.setState({content: event.target.value});
      }

    handleSubmit(event) {
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert("current orderId:", this.props.orderId);

        let buyerName = "wenxin dong";
        if(this.state.anonymous) buyerName = "Anonymous";
        this.props.postUpdate({name: buyerName, content: this.state.content })
        this.props.sendThankYouNote( this.state.content, this.props.orderId,)
        event.preventDefault();
    }

    toggleAnoymous = (e) => {
        this.setState({
            anonymous: !this.state.anonymous,
        })
    }

    render() {
        let note = <Alert light> <b>{"WenXin"}:</b> {this.state.content}! </Alert>;
        if (this.state.anonymous) {
            note = <Alert light> <b>Anonymous:</b> {this.state.content}! </Alert>;
        }

        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} >
                <ModalHeader>Send a thank you note to {this.props.driverName}</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleSubmit}>
       
                <Input type = "textarea" value={this.state.content} onChange={this.handleChange} placeholder = "Thank you for delivering!"/>
                <br/>
                
                <Row className="form-group">
                            <Col xs={12}>
                                <Label check>
                                    <strong>The following update will be made public, do you want it to be anonymous? </strong>
                                </Label>
                            </Col>
                        </Row>
                        {note}
                        <Row className="form-group">
                            <Col xs={12}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox"
                                            className="form-check-input"
                                            onClick={this.toggleAnoymous}
                                        />
                Yes, I want it to be anoymous.
            </Label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="form-group justify-content-center">
                            <Col className="col-auto " >
                                <Button type="submit" color="warning">
                                    <strong> Send! </strong>
                                </Button>
                            </Col>
                        </Row>
                </Form>
                </ModalBody>


            </Modal>
        );
    }
}
export default (SendThankYouNote);