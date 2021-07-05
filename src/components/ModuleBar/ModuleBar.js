import React from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import ModuleBox from "../ModuleBox";
import { BsX } from "react-icons/bs";
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

export default ModuleBar;
