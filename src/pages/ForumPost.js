import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";
import Form from "react-bootstrap/Form";
import Thread from "../components/Board/Thread";

function ForumPost(props) {
  const [thread, setThread] = useState({});
  const [newPostContent, setNewPostContent] = useState();
  const [newPostUser, setNewPostUser] = useState();
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const docRef = database.board.doc(thread.id).collection("post");
  useEffect(() => {
    database.board
      .doc(props.match.params.id)
      .get()
      .then((doc) => setThread(doc.data()));
  }, [props.match.params.id]);

  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        const username = doc.data().username;
        setNewPostUser(username);
      });
  }, [currentUser]);

  useEffect(() => {
    database.board
      .doc(thread.id)
      .collection("post")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
      });
  }, [thread.id]);

  useEffect(() => {
    docRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const _posts = [];
      querySnapshot.forEach((doc) => {
        _posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(_posts);
    });
  }, [thread.id]);

  async function handleAddPost(event) {
    event.preventDefault();
    const date = new Date();
    const newPost = {
      content: newPostContent,
      user: newPostUser,
      timeDisplay: date.toLocaleString(),
      createdAt: date.valueOf(),
      threadId: thread.id,
    };
    await docRef.add(newPost);
  }
  console.log(thread.title);
  return (
    <div>
      <p>{thread.title}</p>
      <p>{thread.user}</p>
      <p>{thread.timeDisplay}</p>
      <p>tags: {thread.tags}</p>
      <form onSubmit={handleAddPost}>
        <Form.Control
          as="textarea"
          rows={4}
          value={newPostContent}
          placeholder="What are your thoughts?"
          onChange={(event) => setNewPostContent(event.target.value)}
        />
        <input type="submit" value="Comment" />
      </form>
      {posts ? (
        <div>
          {posts.map((post, index) => {
            return <Thread thread={post} key={index} />;
          })}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ForumPost;
