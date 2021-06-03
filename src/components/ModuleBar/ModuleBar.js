import React, { useState } from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { BsX } from "react-icons/bs";

import "./ModuleBar.css";

function ModuleBar(props) {
  const { moduleBar, toggleModuleBar, moduleData } = props;
  const [displayedModule, setDisplayedModule] = useState({
    moduleCode: "",
    title: "",
    description: "",
  });
  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={toggleModuleBar} />
      <AutoCompleteSearch
        setDisplayedModule={setDisplayedModule}
        moduleData={moduleData}
      />
      <ModuleBox displayedModule={displayedModule} />
    </div>
  );
}

function ModuleBox(props) {
  const { displayedModule } = props;
  return (
    <div>
      <p className="module-title">
        {displayedModule.moduleCode + " " + displayedModule.title}
      </p>
      <p className="module-description">{displayedModule.description}</p>
    </div>
  );
}

export default ModuleBar;
