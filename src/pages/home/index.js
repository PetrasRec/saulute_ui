import { React, useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
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
           <div className="flex">
                <Card className="flex-child card">
                    <Card.Body>
                        <Card.Title className="card-title">Kontaktai</Card.Title>
                            <hr/>
                            <div className="flex">
                                <div className="flex-child card-text">
                                    <p>Administratorius: 862547152</p>
                                    Klientų aptarnavimas: 864521458
                                </div>
                            </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Home;
