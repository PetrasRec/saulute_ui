import { React, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/auth";
import Root from "./Root";

const App = () => {
    return (
        <>
            <ToastContainer
                enableMultiContainer
                closeOnClick
                position="bottom-right"
                autoClose={5000}
            />
            <Router>
                <Route exact path="/login" component={Auth} />
                <Route exact path="/register" component={Auth} />
                <Route component={Root} />
            </Router>
        </>
    );
};

export default App;
