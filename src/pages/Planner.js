import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ModuleBar from "../components/ModuleBar";
import "./MainStyle.css";

function Planner() {
  const [moduleBar, setModuleBar] = useState(false);
  const [moduleData, setModuleData] = useState([]);
  const toggleModuleBar = () => setModuleBar(!moduleBar);
  useEffect(() => {
    fetch("https://api.nusmods.com/v2/2020-2021/moduleInfo.json")
      .then((response) => response.json())
      .then((data) => {
        setModuleData(data);
      });
  }, []);
  return (
    <div className="planner-backg">
      <Sidebar />
      <ModuleBar
        moduleBar={moduleBar}
        toggleModuleBar={toggleModuleBar}
        moduleData={moduleData}
      />
      <div className="temp-text">
        <button onClick={toggleModuleBar}>Add Module</button>
      </div>
    </div>
  );
}

export default Planner;
