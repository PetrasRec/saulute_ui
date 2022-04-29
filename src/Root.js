import { React, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContainer from "./components/MainContainer";
import Profile from "./pages/profile";
import Users from "./pages/users";
import Rooms from "./pages/rooms";

const Root = () => {
    const [open, setOpen] = useState(false);
    console.log(localStorage.getItem("role"), localStorage.getItem("role") == null);
    if (!localStorage.getItem("role") == null) {
        return null;
    }

    return (
        <>
            <Navbar toggleOpen={() => setOpen(!open)} />
            <Sidebar opened={open} />
            <Switch>
                <MainContainer py="3" px="4" fullWidth>
                    <Route exact path="/" component={Home}></Route>
                    {/*} <Route exact path="/users/profile" component={Profile}></Route> */}
                    <Route exact path="/users" component={Users}></Route>
                    <Route exact path="/profile" component={Profile}></Route>
                    <Route exact path="/:id/rooms" component={Rooms}></Route>
                </MainContainer>
            </Switch>
        </>
    );
};

export default Root;
