import { FiAlertCircle } from "react-icons/fi";
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
        <p>Requires</p>
      </div>
    </>
  );
}

export default AlertBox;
