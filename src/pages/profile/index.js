import { React, useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { getSupervisedUsers, getUserById } from "../../api";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import "./styles.scss";


const Profile = () => {
    const [user, setUser] = useState({
        name: "vardenis",
        surname: "pavarde"
    })

    const [supervisedUsers, setSupervisedUsers] = useState([])

    const fetchData = async () => {
        var user = await getUserById(localStorage.getItem("user_id"));
        var supervised = await getSupervisedUsers(localStorage.getItem("user_id"));
        setSupervisedUsers(supervised.data.supervisedUsers);
        setUser(user.data);
    };

    useEffect(() => {
        fetchData()
    }, []);
    
    return (
        <div className="profile__page">
            <div className="flex-container">
                <img className="flex-profile profile" src="/img/profile.png" />
                <div className="flex-profile">
                    <div className=" profile-summary first">
                        {user.name} {user.surname}
                    </div>
                    <div className="profile-summary second">
                        {user.email}
                    </div>
                    <div className="profile-summary third">
                        {localStorage.getItem("role") === "Admin" ? "Administartorius" : "Prižiūrėtojas"}
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex">
                <Card className="flex-child card">
                    <Card.Body>
                        <Card.Title className="card-title">Informacija</Card.Title>
                        <hr />
                        <div className="flex">
                            <div className="flex-child card-text">
                                <p>Prižiūrimų naudotojų skaičius: {supervisedUsers.length}</p>
                                <ul>
                                    {supervisedUsers.map(x => (
                                        <li style={{marginLeft: "30px"}}>{x.name} {x.surname}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Profile;