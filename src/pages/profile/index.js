import { React, useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import "./styles.scss";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Vardenis",
        surname: "Pavardenis",
    });

    return (
        <div className="profile__page">
            <div className="flex-container">
                <img className="flex-profile profile" src="/img/profile.png" />
                <div className="flex-profile">
                    <div className=" profile-summary first">
                        {user.name} {user.surname}
                    </div>
                    <div className="profile-summary second">
                        prižiūrėtojas 
                    </div>
                </div>
            </div>
            <hr/>
            <div className="flex">
                <Card className="flex-child card">
                    <Card.Body>
                        <Card.Title className="card-title">Informacija</Card.Title>
                            <hr/>
                            <div className="flex">
                                <div className="flex-child card-text">
                                    <p>Prižiūrimų naudotojų skaičius: 10</p>
                                    Pagalbos iškvietimų skaičius: 0
                                </div>
                            </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Profile;