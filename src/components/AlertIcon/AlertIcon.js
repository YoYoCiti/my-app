import { useState, useEffect } from "react";
import { checkPrerequisites } from "../../utils/requisite-checks";
import { FiAlertCircle } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./AlertIcon.css";

function AlertIcon(props) {
  const {
    plannedModules,
    module,
    sem,
    switchModuleBarState,
    setAlertState,
    setDisplayedModule,
    displayedModule,
  } = props;
  const [show, setShow] = useState(false);
  const [tree, setTree] = useState();

  useEffect(() => {
    if (!plannedModules) {
      return;
    }
    checkPrerequisites(plannedModules, module, sem).then((res) => {
      setShow(res !== null);
      setTree(res);
      //Triggers immediate update
      if (displayedModule && displayedModule.moduleCode === module.moduleCode) {
        setAlertState((prevState) => ({ ...prevState, tree: res }));
      }
    });
  }, [plannedModules, module, sem]);

  function handleClickAlert() {
    switchModuleBarState("alert");
    //Set display module so when removed module bar resets
    setDisplayedModule({
      moduleCode: module.moduleCode,
      title: module.title,
      description: module.description,
    });
    setAlertState({
      moduleCode: module.moduleCode,
      title: module.title,
      message: "Prerequisites not fulfilled",
      tree: tree,
    });
  }

  return (
    <>
      {show && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              <strong>Prerequisite unfulfilled.</strong> Click for more info.
            </Tooltip>
          }
        >
          <FiAlertCircle
            className="alert-button"
            onClick={(event) => {
              event.stopPropagation();
              handleClickAlert();
            }}
          />
        </OverlayTrigger>
      )}
    </>
  );
}

export default AlertIcon;
