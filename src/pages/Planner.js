import React from "react";
// import { unionBy } from "lodash";
import "./MainStyle.css";
import PlannerManager from "../components/PlannerManager";

function Planner(props) {
  const { moduleData } = props;

  return (
    <div className="planner-backg">
      <PlannerManager moduleData={moduleData} />
    </div>
  );
}

export default Planner;
