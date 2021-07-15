import React from "react";
import { useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

function Sidebar() {
  const history = useHistory();
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((item, index) => {
          return (
            <li
              key={index}
              className="sidebar-row"
              id={history.location.pathname === item.path ? "active" : ""}
              onClick={() => history.push(item.path)}
            >
              {item.icon}
              <span className="sidebar-row-text">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
