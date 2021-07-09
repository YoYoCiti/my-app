import { BsX, BsPlus } from "react-icons/bs";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import AlertIcon from "../AlertIcon";
import "./PlannerList.css";

function PlannerList(props) {
  const {
    plannedModules,
    setPlannedModules,
    setSemSelected,
    setDisplayedModule,
    switchModuleBarState,
    setAlertState,
    resetModuleBar,
    isTargetModuleDisplayed,
  } = props;
  const { currentUser } = useAuth();

  const isLastCard = (title) => title === "Add Modules";
  const handleSearchModule = (semToAdd) => {
    switchModuleBarState("search");
    setDisplayedModule({
      moduleCode: "",
      title: "",
      description: "",
    });
    setSemSelected(semToAdd);
  };
  const handleClickModule = (module) => {
    switchModuleBarState("display");
    setDisplayedModule({
      moduleCode: module.moduleCode,
      title: module.title,
      description: module.description,
    });
  };

  function handleRemoveModule(sem, mod) {
    //Resets module bar if module being removed is displayed in any way
    if (isTargetModuleDisplayed(plannedModules[sem].acadSemester[mod])) {
      resetModuleBar();
    }
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
        <div className="temp-text">
          <CgSpinnerTwoAlt className="icon-spin" size="50" />
          <div>Loading...</div>
        </div>
      ) : (
        plannedModules.map((sem, index1) => (
          <div className="semester-group">
            <h2>
              Year {Math.floor(index1 / 2) + 1} Sem {index1 % 2 === 0 ? 1 : 2}
            </h2>
            <div className="card-deck-custom" key={index1}>
              {sem.acadSemester.map((module, index2) => (
                <div
                  className={
                    isLastCard(module.title)
                      ? "card-custom-add-mod"
                      : "card-custom"
                  }
                  key={index2}
                  onClick={
                    isLastCard(module.title)
                      ? () => handleSearchModule(index1)
                      : () => handleClickModule(module)
                  }
                >
                  {isLastCard(module.title) ? (
                    <BsPlus className="add-button" />
                  ) : (
                    <>
                      <BsX
                        className="remove-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveModule(index1, index2);
                        }}
                      />
                      <AlertIcon
                        plannedModules={plannedModules}
                        module={module}
                        sem={index1}
                        switchModuleBarState={switchModuleBarState}
                        setAlertState={setAlertState}
                        setDisplayedModule={setDisplayedModule}
                        isTargetModuleDisplayed={isTargetModuleDisplayed}
                      />
                    </>
                  )}
                  <div className="card-body-custom">
                    <p className="card-title-custom">{module.moduleCode}</p>
                    <p className="card-text-custom">{module.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default PlannerList;
