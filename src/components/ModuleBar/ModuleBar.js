import React from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { BsX } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

import "./ModuleBar.css";

function ModuleBar(props) {
  const {
    moduleBar,
    moduleData,
    displayedModule,
    setDisplayedModule,
    plannedModules,
    setPlannedModules,
    resetModuleBar,
    semSelected,
  } = props;

  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={resetModuleBar} />
      <AutoCompleteSearch
        setDisplayedModule={setDisplayedModule}
        moduleData={moduleData}
      />
      <ModuleBox
        displayedModule={displayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
        resetModuleBar={resetModuleBar}
        semSelected={semSelected}
      />
    </div>
  );
}

function ModuleBox(props) {
  const {
    displayedModule,
    plannedModules,
    setPlannedModules,
    resetModuleBar,
    semSelected,
  } = props;
  const { currentUser } = useAuth();

  function handleAddModule() {
    const newPlannedModules = [
      ...plannedModules.slice(0, semSelected),
      {
        acadSemester: [
          ...plannedModules[semSelected].acadSemester.slice(
            0,
            plannedModules[semSelected].acadSemester.length - 1
          ),
          {
            moduleCode: displayedModule.moduleCode,
            title: displayedModule.title,
          },
          {
            moduleCode: "",
            title: "Add Modules",
          },
        ],
      },
      ...plannedModules.slice(semSelected + 1),
    ];

    setPlannedModules(newPlannedModules);
    resetModuleBar();
    database.users
      .doc(currentUser?.uid)
      .update({ plannedModules: newPlannedModules });
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
