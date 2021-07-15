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
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.user}</p>
      <p>{post.createdAt}</p>
    </div>
  );
}

export default ForumPost;
