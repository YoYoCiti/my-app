import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Box from "../Box";
import Form from "react-bootstrap/Form";

function Board() {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadUser, setNewThreadUser] = useState();
  const [postNewThread, setPostNewThread] = useState(false);
  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        const username = doc.data().username;
        setNewThreadUser(username);
      });
  }, [currentUser]);

  useEffect(() => {
    database.board
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setThreads(data);
      });
  }, []);

  useEffect(() => {
    database.board.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const _threads = [];
      querySnapshot.forEach((doc) => {
        _threads.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setThreads(_threads);
    });
  }, []);

  return (
    <>
      <button onClick={() => setPostNewThread(true)}> New Thread</button>
      {postNewThread && (
        <PostThread
          threads={threads}
          setThreads={setThreads}
          newThreadUser={newThreadUser}
          setPostNewThread={setPostNewThread}
        />
      )}
      <Threads threads={threads} />
    </>
  );
}

function PostThread(props) {
  const { newThreadUser, setPostNewThread } = props;
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");

  async function handleAddThread(event) {
    event.preventDefault();
    const date = new Date();
    addThread(newThreadText, newThreadUser, newThreadTitle, date);
    setPostNewThread(false);
  }

  async function addThread(newThreadText, newThreadUser, newThreadTitle, time) {
    await database.board
      .add({
        title: newThreadTitle,
        content: newThreadText,
        user: newThreadUser,
        createdAt: time.toLocaleString(),
      })
      .then((docRef) => docRef.update({ id: docRef.id }));
  }

  return (
    <Box>
      <form onSubmit={handleAddThread}>
        <h3>Create New Thread</h3>
        <Form.Group>
          <Form.Control
            type="text"
            value={newThreadTitle}
            placeholder="Title"
            onChange={(event) => setNewThreadTitle(event.target.value)}
            required //Input cannot be empty
            pattern=".*\S.*" //Input must have at least one character that is not a space
          />
          <br />
          <Form.Control
            as="textarea"
            rows={4}
            value={newThreadText}
            placeholder="Text (optional)"
            onChange={(event) => setNewThreadText(event.target.value)}
          />
        </Form.Group>
        <input type="submit" value="Add" />
      </form>
    </Box>
  );
}

function Threads(props) {
  const formatter = buildFormatter(enStrings);
  const { threads } = props;

  // if (!threads.length) {
  //     return (
  //         <p>No threads here yet</p>
  //     )
  // } else {
  //     return (
  //         <div>
  //             {threads.map(({key, value:thread}) => {
  //                 <p>{thread.description}</p>
  //             })}
  //         </div>
  //     )

  return (
    <>
      <div>
        {threads.map((thread) => {
          return (
            <Thread thread={thread} formatter={formatter} key={thread.id} />
          );
        })}
      </div>
    </>
  );
}

function Thread(props) {
  const { thread, formatter } = props;
  return (
    <div key={thread.id}>
      <p>User: {thread.user}</p>
      <p>Title: {thread.title}</p>
      <p>Text: {thread.text}</p>
      <p>Time: {thread.time}</p>
      <TimeAgo date={thread.time} formatter={formatter} minPeriod="MINUTE" />
    </div>
  );
}

export default Board;
