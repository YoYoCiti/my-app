import { FiAlertCircle } from "react-icons/fi";
import TreeSelect from "../TreeSelect";
import "./AlertBox.css";

function AlertBox(props) {
  const { alertState } = props;
  return (
    <>
      <p className="module-title">
        {alertState.moduleCode + " " + alertState.title}
      </p>
      <div className="alert-message">
        <FiAlertCircle /> {""}
        <span>{alertState.message}</span>
      </div>
      <p className="alert-message">Requires</p>
      <TreeSelect alertState={alertState} />
    </>
  );
}

export default AlertBox;
