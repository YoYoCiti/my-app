import React, { useState } from "react";
import "./PlannerManager.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ModuleBar from "../ModuleBar";
import { BsX } from "react-icons/bs";

function PlannerManager(props) {
  const { moduleData } = props;
  const [moduleBar, setModuleBar] = useState(false);
  const [displayedModule, setDisplayedModule] = useState({
    moduleCode: "",
    title: "",
    description: "",
  });
  const [plannedModules, setPlannedModules] = useState(
    Array(8).fill([{ moduleCode: "", title: "Add Modules" }])
  );
  const [semSelected, setSemSelected] = useState(-1);

  const resetModuleBar = () => {
    setModuleBar(false);
    setDisplayedModule({ moduleCode: "", title: "", description: "" });
  };
  return (
    <div className="container">
      <div className="container-2">
        <PlannerList
          setModuleBar={setModuleBar}
          plannedModules={plannedModules}
          setPlannedModules={setPlannedModules}
          setSemSelected={setSemSelected}
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
      />
    </div>
  );
}

function PlannerList(props) {
  const { setModuleBar, plannedModules, setPlannedModules, setSemSelected } =
    props;
  function handleRemoveModule(sem, mod) {
    const newPlannedModules = [
      ...plannedModules.slice(0, sem),
      [
        ...plannedModules[sem].slice(0, mod),
        ...plannedModules[sem].slice(mod + 1),
      ],
      ...plannedModules.slice(sem + 1),
    ];
    setPlannedModules(newPlannedModules);
  }

  return (
    <>
      {plannedModules.map((sem, index1) => (
        <>
          <h2>
            Year {Math.floor(index1 / 2) + 1} Sem {index1 % 2 === 0 ? 1 : 2}
          </h2>
          <CardDeck key={index1}>
            {sem.map((module, index2) => (
              <Card
                key={index2}
                style={{ width: "10rem" }}
                onClick={
                  module.title === "Add Modules"
                    ? () => {
                        setModuleBar(true);
                        setSemSelected(index1);
                      }
                    : () => false
                }
              >
                {module.title !== "Add Modules" && (
                  <BsX
                    className="remove-button"
                    onClick={() => handleRemoveModule(index1, index2)}
                  />
                )}
                <Card.Title>{module.moduleCode}</Card.Title>
                <Card.Text>{module.title}</Card.Text>
              </Card>
            ))}
          </CardDeck>
        </>
      ))}
    </>
  );
}

export default PlannerManager;
