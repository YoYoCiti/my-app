import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";

function ForumPost(props) {
  const [threadId, setThreadId] = useState();

  useEffect(() => {
    console.log(props.match.params.id);
    setThreadId(props.match.params.id);
  }, [props.match.params.id]);
  return <div>{threadId}this fucker is hidden isnit </div>;
}

export default ForumPost;
