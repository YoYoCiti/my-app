import React, { useState } from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { BsX } from "react-icons/bs";

import "./ModuleBar.css";

function ModuleBar(props) {
  const { moduleBar, toggleModuleBar } = props;
  const [displayedModule, setDisplayedModule] = useState({
    title: "",
    description: "",
  });
  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={toggleModuleBar} />
      <AutoCompleteSearch setDisplayedModule={setDisplayedModule} />
      <ModuleBox displayedModule={displayedModule} />
    </div>
  );
}

function ModuleBox(props) {
  const { displayedModule } = props;
  return (
    <div>
      <p className="module-title">{displayedModule.title}</p>
      <p className="module-description">{displayedModule.description}</p>
    </div>
  );
}

export default ModuleBar;
