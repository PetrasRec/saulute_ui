import { React, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContainer from "./components/MainContainer";
import Profile from "./pages/profile";
import Users from "./pages/users";

const Root = () => {
    const [open, isOpen] = useState(true);
    console.log(localStorage.getItem("role"), localStorage.getItem("role") == null);
    if (!localStorage.getItem("role")) {
        return null;
    }

    return (
        <>
            <Navbar />
            <Sidebar opened={open} toggleOpen={() => isOpen(!open)} />
            <Switch>
                <MainContainer py="3" px="4" fullWidth>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/users/profile" component={Profile}></Route>
                    <Route exact path="/users" component={Users}></Route>
                </MainContainer>
            </Switch>
        </>
    );
};

export default Root;
