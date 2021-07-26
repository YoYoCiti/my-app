import { ProgressBar } from "react-bootstrap";
import "./ProgressCard.css";

function ProgressCard(props) {
  const { plannedModules, yearOfStudy } = props;

  function calculateMCs() {
    if (!plannedModules) {
      return { taken: 0, planned: 0 };
    } else {
      let MCsTaken = 0;
      let MCsPlanned = 0;
      plannedModules.slice().forEach((element, index) => {
        element.acadSemester.forEach((mod) => {
          if (mod.moduleCode !== "") {
            // console.log(index);
            // console.log(yearOfStudy);
            if (index < yearOfStudy) {
              MCsTaken += mod.moduleCredit;
            } else {
              MCsPlanned += mod.moduleCredit;
            }
          }
        });
      });
      return { taken: MCsTaken, planned: MCsPlanned };
    }
  }

  return (
    <div className="progress-card">
      <div className="progress-card-body">
        <h1 style={{ textAlign: "center", padding: "0 0 1rem 0" }}>
          My Progress
        </h1>
        <ProgressBar>
          <ProgressBar
            variant="success"
            now={calculateMCs().taken}
            label={`${calculateMCs().taken}MCs Taken`}
            max={160}
            key={1}
          />
          <ProgressBar
            variant="warning"
            now={calculateMCs().planned}
            label={`${calculateMCs().planned}MCs Planned`}
            max={160}
            key={2}
          />
        </ProgressBar>
        <span style={{ marginRight: "1rem", textAlign: "end" }}>
          {calculateMCs().taken + calculateMCs().planned}/160MCs To Graduation
        </span>
      </div>
    </div>
  );
}

export default ProgressCard;
