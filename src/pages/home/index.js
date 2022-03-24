import { React, useState, useEffect } from "react";
import ActiveBets from "./components/activeBets";
import Banner from "./components/banner";
import BetForm from "./components/betForm";
import BetsTable from "./components/betsTable";
import FuturedBet from "./components/futuredBet";
import { messageHandling } from '../../utils/messageHandling';
 
import { getAllActiveBets, getProfile, createOffer, getUserOffers } from "../../api";
import "./styles.scss";

const Home = () => {
    return (
        <>
           Saulute
        </>
    );
};

export default Home;
