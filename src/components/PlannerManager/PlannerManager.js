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
  const toggleModuleBar = () => setModuleBar(!moduleBar);

  return (
    <>
      <ModuleBar
        moduleBar={moduleBar}
        toggleModuleBar={toggleModuleBar}
        moduleData={moduleData}
        displayedModule={displayedModule}
        setDisplayedModule={setDisplayedModule}
      />
      <div className="temp-text">
        <button onClick={toggleModuleBar}>Add Module</button>
      </div>
    </>
  );
}

function PlannerList(props) {
  const { toggleModuleBar } = props;
  return (
    <CardDeck>
      <Card>
        <Card.Title>CS1101S </Card.Title>
        <Card.Text>Programming Methodology</Card.Text>
      </Card>
      <Card className="text-center" onClick={toggleModuleBar}>
        <Card.Text>Add Module</Card.Text>
      </Card>
    </CardDeck>
  );
}

export default PlannerManager;
