import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Board from "../components/Thread/Thread";

function Forum() {
  return (
    <div>
      <Sidebar />
      {/* <NewThread /> */}
      <Board />
      <div className="temp-text">
        <h1>Forum</h1>
      </div>
    </div>
  );
}

export default Forum;
