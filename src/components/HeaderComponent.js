import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, Button, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from "react-router-dom";
import {useHistory, withRouter} from "react-router-dom"
  
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleGoogleLogin(event) {
        this.toggleModal();
        this.props.googleLogin();
        event.preventDefault();
    }
    handleFacebookLogin(event) {
        this.toggleModal();
        this.props.facebookLogin();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
        this.props.history.push("/home");
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
                            
                            <img src="assets/images/logo2.png" height="35" width="70" alt="PonyExpress" align-vertical />
                            Pony Express
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar   >
                            <Nav navbar className="ml-auto" >
                                <NavItem>
                                        <NavLink className="nav-link" to="/mission">
                                            Our Missions
                                        </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink className="nav-link" to="/requestPage" >
                                        Requests
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink className="nav-link" to="/mission" >
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink className="nav-link" to="/qa" >
                                        {"Q&A   "}
                                    </NavLink>
                                </NavItem>
                                { this.props.auth.isAuthenticated ?
                                <NavItem>
                                    <NavLink className="nav-link" to="/notifications">
                                        Notifications
                            </NavLink>
                                </NavItem>
                                : <></>}

                            </Nav>

                            <Nav navbar>
                            <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3"><NavLink className="nav-link" to="/myorders">{this.props.auth.user.displayName}</NavLink></div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                                </NavItem>

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login to Pony Express</ModalHeader>
                    <ModalBody>
                        <div className = "text-center"><Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
</div>
                        <br></br>
                        <div className = "text-center"><Button color="info" onClick={this.handleFacebookLogin}><span className="fa fa-facebook fa-lg"></span> Login with Facebook</Button></div>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);