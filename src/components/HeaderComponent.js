import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, Button, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'; //redirecting to http://localhost:3000/
import FacebookLogin from 'react-facebook-login';


const responseGoogle = (response) => {
    console.log(response);
  }

function getLoc() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
        });
    }
}
  
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar  light expand="md" className = "header" style = {{marginBottom: "20px"}}>
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto logo" href="/">
                            Pony Express
                            {/* <img src="assets/images/logo.png" height="35" width="70" alt="PonyExpress" align-vertical /> */}
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar   >
                            <Nav navbar className="ml-auto" >
                                <NavItem >
                                    <NavLink className="nav-link" to="/requestPage" onClick={getLoc()}>
                                        Requests
                                    </NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/notifications">
                                        Notifications
                            </NavLink>
                                </NavItem>
                                <NavItem style = {{marginRight:"10px"}}>
                                    <NavLink className="nav-link" to="/myorders">
                                        My orders  
                            </NavLink>
                                </NavItem>

                            </Nav>

                            <Nav navbar>
                                <NavItem margin>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>

                            <FormGroup>

                            <GoogleLogin
    clientId="400905135229-cgkga1l4khkj31ijv6mkne6gvlfsh2b7.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check style = {{marginBottom: "15px"}}>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>




                            
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;