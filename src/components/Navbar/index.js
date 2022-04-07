import React from 'react'
import { useHistory } from "react-router";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "./style.css";

const NavigationBar = ({ toggleOpen }) => {
    return (
        <Navbar style={{ zIndex: 1 }} className="navbar" expand="lg" sticky="top">
            <button onClick={toggleOpen} className="material-icons hamburger-btn">
                menu
            </button>
            <Navbar.Brand href="/">
                <img src={"img/logo.png"} width="50px" height="25px" alt="Logo" />
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