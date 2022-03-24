import React, { useState } from "react";
import PropTypes from "prop-types";
import { rippleAnimation } from "../../../utils/animation";
import "./style.css";

const List = ({
  title, children, openedState, className, sidebar, icon,
}) => {
  const [isOpened, setIsOpened] = useState(openedState);

  const renderItems = () => {
    if (isOpened) {
      return children;
    }
    return null;
  };

  const onItemClick = (e) => {
    if (sidebar) {
      rippleAnimation(e);
    }
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div className="list">
        <div className={`${className || "list-dropdown"} ${sidebar && isOpened ? "expanded" : ""}`} onClick={(e) => onItemClick(e)}>
          <div className={`list-name ${sidebar && icon ? "sidebar-name" : ""}`}>
            {icon ? (
              <i className={`sidebar-icon ${icon}`} />
            ) : null}
            {title}
          </div>
          <span className="material-icons">
            keyboard_arrow_{isOpened ? "up" : "down"}
          </span>
        </div>
        <div className="list-items">
          {renderItems()}
        </div>
      </div>
    </>
  );
};

List.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
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
  openedState: PropTypes.bool,
  className: PropTypes.string,
  sidebar: PropTypes.bool,
  icon: PropTypes.string,
};

export default List;