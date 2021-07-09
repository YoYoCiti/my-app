import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";

function ForumPost(props) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    database.board
      .doc(props.match.params.id)
      .get()
      .then((doc) => setPost(doc.data()));
  }, [props.match.params.id]);
  return <div>{post.title}</div>;
}

export default ForumPost;
