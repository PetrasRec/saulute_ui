import React from "react";
import "./style.css";
import SidebarItem from "../SidebarItem";


const Sidebar = ({ opened }) => {

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
        <SidebarItem url="/beacons">
          <span className="material-icons">
          cast
          </span>
          Švyturiai
        </SidebarItem>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;