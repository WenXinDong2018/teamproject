import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, Button, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from "react-router-dom";
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
                <Navbar  light expand="md" className = "header">
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto logo" href="/">
                            Pony Express
                            {/* <img src="assets/images/logo.png" height="35" width="70" alt="PonyExpress" align-vertical /> */}
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar   >
                            <Nav navbar className="ml-auto" >
                                <NavItem >
                                    <NavLink className="nav-link" to="/requestPage">
                                        Requests
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/courierPage">
                                        Couriers
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
                                <Label check>
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