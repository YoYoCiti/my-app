import React from "react";
import Board from "../components/Board/Board";

function Forum(props) {
  const { test } = props;
  console.log(test);
  return (
    <div className="forum-margin-temp">
      <Board />
    </div>
  );
}

export default Forum;
