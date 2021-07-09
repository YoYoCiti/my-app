import React, { useEffect, useState } from "react";
import "./PlannerManager.css";
import ModuleBar from "../ModuleBar";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import PlannerList from "../PlannerList";

function PlannerManager(props) {
  const { moduleData } = props;
  const { currentUser } = useAuth();
  const [moduleBar, setModuleBar] = useState(false);
  const [displayedModule, setDisplayedModule] = useState({
    moduleCode: "",
    title: "",
    description: "",
  });
  const [plannedModules, setPlannedModules] = useState();
  const [semSelected, setSemSelected] = useState(-1);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertState, setAlertState] = useState({
    moduleCode: "",
    title: "",
    message: "",
    tree: {},
  });

  const switchModuleBarState = (state) => {
    switch (state) {
      case "search":
        setDisplaySearch(true);
        setIsAlert(false);
        setModuleBar(true);
        break;

      case "display":
        setDisplaySearch(false);
        setIsAlert(false);
        setModuleBar(true);
        break;

      case "alert":
        setDisplaySearch(false);
        setIsAlert(true);
        setModuleBar(true);
        break;

      default:
        break;
    }
  };

  const resetModuleBar = () => {
    setModuleBar(false);
    setDisplayedModule({ moduleCode: "", title: "", description: "" });
  };

  const isTargetModuleDisplayed = (targetModule) => {
    return (
      displayedModule && targetModule.moduleCode === displayedModule.moduleCode
    );
  };

  useEffect(() => {
    database.users.doc(currentUser?.uid).onSnapshot((doc) => {
      setPlannedModules(doc.data().plannedModules);
    });
  }, [currentUser]);

  return (
    <div className={moduleBar ? "container-minimised" : "main-container"}>
      <div>
        <PlannerList
          plannedModules={plannedModules}
          setPlannedModules={setPlannedModules}
          setSemSelected={setSemSelected}
          setDisplayedModule={setDisplayedModule}
          switchModuleBarState={switchModuleBarState}
          setAlertState={setAlertState}
          resetModuleBar={resetModuleBar}
          isTargetModuleDisplayed={isTargetModuleDisplayed}
        />
      </div>
      <ModuleBar
        moduleBar={moduleBar}
        moduleData={moduleData}
        displayedModule={displayedModule}
        setDisplayedModule={setDisplayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
        resetModuleBar={resetModuleBar}
        semSelected={semSelected}
        displaySearch={displaySearch}
        isAlert={isAlert}
        alertState={alertState}
      />
    </div>
  );
}

export default PlannerManager;
