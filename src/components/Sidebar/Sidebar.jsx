import React from "react";
import "./style.css";
import SidebarItem from "../SidebarItem";


const Sidebar = ({ opened,userid }) => {

  return (
    <div className={`sidebar ${opened ? "opened" : "closed"}`}>
      <ul>
        <SidebarItem url="/">
          <span className="material-icons">
            home
          </span>
          Home
        </SidebarItem>
        <SidebarItem url="/users">
          <span className="material-icons">
          elderly
          </span>
          Prižiūrimieji
        </SidebarItem>
        <SidebarItem url="/profile">
          <span className="material-icons">
          person
          </span>
          Profilis
        </SidebarItem>
       
        {localStorage.getItem("role") === 'Admin'? 
        <SidebarItem url="/beacons">
          <span className="material-icons">
          cast
          </span>
          Švyturiai
        </SidebarItem>
        : null } 

      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;