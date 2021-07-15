import React, { useEffect, useState } from "react";
import { unionBy } from "lodash";
import "./MainStyle.css";
import PlannerManager from "../components/PlannerManager";

function Planner() {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    const urls = [
      "https://api.nusmods.com/v2/2021-2022/moduleInfo.json",
      "https://api.nusmods.com/v2/2020-2021/moduleInfo.json",
    ];
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    ).then((results) => {
      setModuleData(unionBy(results[0], results[1], "moduleCode"));
    });
  }, []);

  return (
    <div className="planner-backg">
      <PlannerManager moduleData={moduleData} />
    </div>
  );
}

export default Planner;
