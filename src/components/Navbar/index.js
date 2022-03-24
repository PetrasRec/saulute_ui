import React from 'react'
import { useHistory } from "react-router";
import { Navbar, Nav} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "./style.css";

const NavigationBar = () => {
    return(
        <Navbar className="navbar" expand="lg" sticky="top">
            <span className="material-icons hamburger-btn">
                menu
            </span>
            <Navbar.Brand href="/">
                <img src={"img/logos.png"} width="100px" height="50px" alt="Logo" />
            </Navbar.Brand>
            <Nav className="ml-auto right-nav right-icons">
                <li className="nav-item nav-icon">
                    <NavLink exact to={"/users/profile"}>
                        <span className="material-icons">account_circle</span>
                    </NavLink>
                </li>
                <li className="nav-item nav-icon">
                    <NavLink exact to={"/login"}>
                        <span className="material-icons">exit_to_app</span>
                    </NavLink>
                </li>
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;