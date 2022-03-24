import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

const SidebarItem = ({ url, children, childItem }) => {

  return (
    <li onClick={(e) => {}} className="sidebar-item" key="sidebar-item">
      <NavLink
        exact
        to={url}
        className="sidebar-link"
      >
        {
          childItem ? (
            <span className="child-item" />
          ) : null
        }
        {children}
      </NavLink>
    </li>
  );
};

export default SidebarItem;

SidebarItem.propTypes = {
  url: PropTypes.string.isRequired,
  childItem: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object,
    ])),
  ]),
};