import { React, useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import { getSupervisedUsers } from "../../api";
import "./styles.scss";

const Rooms = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState('');


  const fetchData = async () => {
    const data = await getSupervisedUsers(localStorage.getItem("user_id"));
    setUsers(data.data);
  }
  useEffect(() => {

    fetchData()
  }, []);


  function Options({ options }) {
    return (
      options?.map(option =>
        <option key={option.name} value={option.name + " " + option.surname}>
          {option.name + " " + option.surname}
        </option>)
    );
  }

  const handleCategoryChange = (usr) => {
    setSelectedUser(usr);
    const targetDiv = document.getElementsByClassName("hidden");
    for (var i = 0; i < targetDiv.length; i++) {
      targetDiv[i].style.visibility = "visible";
    }
  }

  // if (!users.diedukai) {
  //   return (<div>nera dieduku</div>)
  // }

  return (
    <div className="room_page">
      <div className="flex-container">
        <div className="flex-users">
          <div className="users-title">
            Pasirinkite prižiūrimojo profilį
          </div>
          {users.length && <div className="dropdown">
            <select name="animal" value={selectedUser} onChange={event => handleCategoryChange(event.target.value)}
              className="form-control">
              {
                <Options options={users} />
              }
            </select>
          </div>}
        </div>
      </div>

      <div id="rooms" >
        <div className="hidden">
          <p id="testtext">{selectedUser}</p>
        </div>
      </div>
    </div>
  );
};

export default Rooms;