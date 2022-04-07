import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router";
import Login from './Login'
import Register from "./Register";

import "./styles.scss"

const curr_year = new Date().getFullYear()


const Auth = ({match}) => {
    localStorage.removeItem("role");
    return (
        <>
        <Container className="position-relative vh-100">
            <div className="auth__card">
                <div className="auth__form">
                    {
                        match.path == "/login" 
                        ? <Login /> 
                        : <Register />
                    }
                    <div className="auth__form_footer">
                        &copy; Saulutė {curr_year}
                    </div>
                </div>

                <div className="auth__card_bg">
                    <img src="/img/first_picture.png" />
                    <div className="title">
                        <h1>Senelių priežiūra</h1>
                        <p> Kol Saulutė švies senjorai bus saugūs</p>
                    </div>
                </div>
            </div>
        </Container>
        </>
    );
};

export default Auth;
