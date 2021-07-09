import React from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";
import ModuleBox from "../ModuleBox";
import { BsX } from "react-icons/bs";
import "./ModuleBar.css";
import AlertBox from "../AlertBox";

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
    displaySearch,
    isAlert,
    alertState,
  } = props;

  return (
    <div className={moduleBar ? "module-bar-active" : "module-bar-off"}>
      <BsX className="close-button" onClick={resetModuleBar} />
      {displaySearch && (
        <AutoCompleteSearch
          setDisplayedModule={setDisplayedModule}
          moduleData={moduleData}
          semSelected={semSelected}
        />
      )}
      {isAlert ? (
        <AlertBox alertState={alertState} />
      ) : (
        <ModuleBox
          displayedModule={displayedModule}
          plannedModules={plannedModules}
          setPlannedModules={setPlannedModules}
          resetModuleBar={resetModuleBar}
          semSelected={semSelected}
          displaySearch={displaySearch}
        />
      )}
    </div>
  );
}

export default ModuleBar;
