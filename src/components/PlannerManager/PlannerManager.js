import React, { useState } from "react";
import "./PlannerManager.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ModuleBar from "../ModuleBar";

function PlannerManager(props) {
  const { moduleData } = props;
  const [moduleBar, setModuleBar] = useState(false);
  const [displayedModule, setDisplayedModule] = useState({
    moduleCode: "",
    title: "",
    description: "",
  });
  const [plannedModules, setPlannedModules] = useState([
    { moduleCode: "CS1101S", title: "Programming Methodology" },
    { moduleCode: "", title: "Add Modules" },
  ]);
  const toggleModuleBar = () => setModuleBar(!moduleBar);

  return (
    <div className="container">
      <PlannerList
        toggleModuleBar={toggleModuleBar}
        plannedModules={plannedModules}
      />
      <ModuleBar
        moduleBar={moduleBar}
        toggleModuleBar={toggleModuleBar}
        moduleData={moduleData}
        displayedModule={displayedModule}
        setDisplayedModule={setDisplayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
      />
    </div>
  );
}

function PlannerList(props) {
  const { toggleModuleBar, plannedModules } = props;
  return (
    <CardDeck>
      {plannedModules.map((module, index) => (
        <Card
          key={index}
          onClick={
            index === plannedModules.length - 1 ? toggleModuleBar : () => false
          }
        >
          <Card.Title>{module.moduleCode}</Card.Title>
          <Card.Text>{module.title}</Card.Text>
        </Card>
      ))}
    </CardDeck>
  );
}

export default PlannerManager;
