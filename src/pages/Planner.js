import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ModuleBar from "../components/ModuleBar";
import "./MainStyle.css";

function Planner() {
  const [moduleBar, setModuleBar] = useState(false);
  const toggleModuleBar = () => setModuleBar(!moduleBar);
  return (
    <>
      <Sidebar />
      <ModuleBar moduleBar={moduleBar} toggleModuleBar={toggleModuleBar} />
      <div className="temp-text">
        <button onClick={toggleModuleBar}>Add Module</button>
      </div>
    </>
  );
}

export default Planner;
