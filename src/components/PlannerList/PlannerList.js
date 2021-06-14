import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { BsX } from "react-icons/bs";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./PlannerList.css";

function PlannerList(props) {
  const {
    setModuleBar,
    plannedModules,
    setPlannedModules,
    setSemSelected,
    setDisplayedModule,
    setDisplayOnly,
  } = props;
  const { currentUser } = useAuth();

  function handleRemoveModule(sem, mod) {
    const newPlannedModules = [
      ...plannedModules.slice(0, sem),
      {
        acadSemester: [
          ...plannedModules[sem].acadSemester.slice(0, mod),
          ...plannedModules[sem].acadSemester.slice(mod + 1),
        ],
      },
      ...plannedModules.slice(sem + 1),
    ];

    setPlannedModules(newPlannedModules);
    database.users
      .doc(currentUser?.uid)
      .update({ plannedModules: newPlannedModules });
  }

  return (
    <>
      {!plannedModules ? (
        <div className="temp-text">Loading...</div>
      ) : (
        plannedModules.map((sem, index1) => (
          <>
            <h2>
              Year {Math.floor(index1 / 2) + 1} Sem {index1 % 2 === 0 ? 1 : 2}
            </h2>
            <CardDeck key={index1}>
              {sem.acadSemester.map((module, index2) => (
                <Card
                  key={index2}
                  style={{ width: "10rem" }}
                  onClick={
                    module.title === "Add Modules"
                      ? () => {
                          setDisplayOnly(false);
                          setModuleBar(true);
                          setDisplayedModule({
                            moduleCode: "",
                            title: "",
                            description: "",
                          });
                          setSemSelected(index1);
                        }
                      : () => {
                          setDisplayOnly(true);
                          setModuleBar(true);
                          setDisplayedModule({
                            moduleCode: module.moduleCode,
                            title: module.title,
                            description: module.description,
                          });
                        }
                  }
                >
                  {module.title !== "Add Modules" && (
                    <BsX
                      className="remove-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveModule(index1, index2);
                      }}
                    />
                  )}
                  <Card.Title>{module.moduleCode}</Card.Title>
                  <Card.Text>{module.title}</Card.Text>
                </Card>
              ))}
            </CardDeck>
          </>
        ))
      )}
    </>
  );
}

export default PlannerList;
