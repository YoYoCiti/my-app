import React from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { BsX } from "react-icons/bs";
import Button from "react-bootstrap/Button";

import "./ModuleBar.css";

function ModuleBar(props) {
  const {
    moduleBar,
    toggleModuleBar,
    moduleData,
    displayedModule,
    setDisplayedModule,
    plannedModules,
    setPlannedModules,
  } = props;

  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={toggleModuleBar} />
      <AutoCompleteSearch
        setDisplayedModule={setDisplayedModule}
        moduleData={moduleData}
      />
      <ModuleBox
        displayedModule={displayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
        setDisplayedModule={setDisplayedModule}
        toggleModuleBar={toggleModuleBar}
      />
    </div>
  );
}

function ModuleBox(props) {
  const {
    displayedModule,
    plannedModules,
    setPlannedModules,
    setDisplayedModule,
    toggleModuleBar,
  } = props;
  function handleAddModule() {
    const newPlannedModules = [
      ...plannedModules.slice(0, plannedModules.length - 1),
      {
        moduleCode: displayedModule.moduleCode,
        title: displayedModule.title,
      },
      { moduleCode: "", title: "Add Modules" },
    ];
    setPlannedModules(newPlannedModules);
    toggleModuleBar();
    setDisplayedModule({
      moduleCode: "",
      title: "",
      description: "",
    });
  }
  return (
    <div>
      <p className="module-title">
        {displayedModule.moduleCode + " " + displayedModule.title}
      </p>
      <p className="module-description">{displayedModule.description}</p>
      {displayedModule.moduleCode && (
        <Button
          className="add-module-button"
          variant="info"
          size="sm"
          onClick={handleAddModule}
        >
          Add Module
        </Button>
      )}
    </div>
  );
}

export default ModuleBar;
