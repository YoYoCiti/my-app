import { useState, useEffect } from "react";
import { checkPrerequisites } from "../../utils/requisite-checks";
import { FiAlertCircle } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./AlertIcon.css";

function AlertIcon(props) {
  const { plannedModules, module, sem, switchModuleBarState, setAlertState } =
    props;
  const [show, setShow] = useState(false);
  const [tree, setTree] = useState();

  useEffect(() => {
    if (!plannedModules) {
      return;
    }
    checkPrerequisites(plannedModules, module, sem).then((res) => {
      setShow(res !== null);
      setTree(res);
    });
  }, [plannedModules, module, sem]);

  function handleClickAlert() {
    switchModuleBarState("alert");
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
