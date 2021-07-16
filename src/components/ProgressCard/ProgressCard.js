import { ProgressBar } from "react-bootstrap";
import "./ProgressCard.css";

function ProgressCard() {
  return (
    <div className="progress-card">
      <h1>My Progress</h1>
      <div className="progress-card-body">
        <ProgressBar>
          <ProgressBar
            variant="success"
            now={40}
            label={`40MCs`}
            max={120}
            key={1}
          />
          <ProgressBar
            variant="warning"
            now={60}
            label={`60MCs`}
            max={120}
            key={2}
          />
        </ProgressBar>
        <span style={{ marginRight: "1rem", textAlign: "end" }}>
          90/120MCs To Graduation
        </span>
      </div>
    </div>
  );
}

export default ProgressCard;
