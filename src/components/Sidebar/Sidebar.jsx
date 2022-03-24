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
        { localStorage.getItem("role") == "Admin" && (
          <>
            <SidebarItem url="/users">
                <span className="material-icons">
                group_add
                </span>
                Prižiūrimi žmonės
            </SidebarItem>
            <SidebarItem url="/bets">
                <span className="material-icons">
                casino
                </span>
                Ataskaita
            </SidebarItem>
          </>
        )
        }
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;