import React, { useEffect, useState } from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import { BsX } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { checkInvalidEntry } from "../../utils/planner-utils";
import { Alert } from "react-bootstrap";
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
    displayOnly,
  } = props;

  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={resetModuleBar} />
      {!displayOnly && (
        <AutoCompleteSearch
          setDisplayedModule={setDisplayedModule}
          moduleData={moduleData}
        />
      )}
      <ModuleBox
        displayedModule={displayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
        resetModuleBar={resetModuleBar}
        semSelected={semSelected}
        displayOnly={displayOnly}
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
    displayOnly,
  } = props;
  const { currentUser } = useAuth();
  const [error, setError] = useState({
    disabled: false,
    message: "",
  });

  useEffect(() => {
    if (!plannedModules || !displayedModule.moduleCode) {
      return;
    }
    const errorState = checkInvalidEntry(
      plannedModules,
      displayedModule,
      semSelected
    );
    setError(errorState);
  }, [displayedModule, plannedModules, semSelected]);

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
            description: displayedModule.description,
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
      {displayedModule.moduleCode && !displayOnly && (
        <>
          <Button
            className="add-module-button"
            variant="info"
            size="sm"
            disabled={error.disabled}
            onClick={handleAddModule}
          >
            Add Module
          </Button>
          <div className="error-box">
            {error.disabled && <Alert variant="warning">{error.message}</Alert>}
          </div>
        </>
      )}
      <p className="module-description">{displayedModule.description}</p>
    </div>
  );
}

export default ModuleBar;
