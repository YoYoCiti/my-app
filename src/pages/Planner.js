import React from "react";
import "../components/Sidebar/Sidebar.css";
import Sidebar from "../components/Sidebar/Sidebar";

function Planner() {
  return (
    <>
      <Sidebar />
      <div className="temp-text">
        <h1>Planner</h1>
      </div>
    </>
  );
}

export default Planner;