import React, { useState } from "react";
import AutoCompleteSearch from "../AutoCompleteSearch";

import "./ModuleBar.css";

function ModuleBar() {
  const [displayedModule, setDisplayedModule] = useState({
    title: "",
    description: "",
  });
  return (
    <div className="module-bar">
      <AutoCompleteSearch setDisplayedModule={setDisplayedModule} />
      <ModuleBox displayedModule={displayedModule} />
    </div>
  );
}

function ModuleBox(props) {
  const { displayedModule } = props;
  return (
    <div>
      <p className="module-title">{displayedModule.title}</p>
      <p className="module-description">{displayedModule.description}</p>
    </div>
  );
}

export default ModuleBar;
