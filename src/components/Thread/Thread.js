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
  const { threads, setThreads, newThreadUser, setPostNewThread } = props;
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");

  async function handleAddThread(event) {
    event.preventDefault();
    const date = Date().toLocaleString();
    addThread(newThreadText, newThreadUser, newThreadTitle, date);
    setPostNewThread(false);
  }

  function addThread(newThreadText, newThreadUser, newThreadTitle, Time) {
    const newThreads = [
      {
        title: newThreadTitle,
        text: newThreadText,
        user: newThreadUser,
        time: Time,
        //boardId: "0000",
      },
      ...threads,
    ];
    setThreads(newThreads);
  }

  return (
    <Box>
      <form onSubmit={handleAddThread}>
        <h2>Create New Thread</h2>
        <input
          type="text"
          value={newThreadTitle}
          placeholder="Title"
          onChange={(event) => setNewThreadTitle(event.target.value)}
          required="required"
        />
        <br />
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={4}
            value={newThreadText}
            placeholder="Text (optional)"
            onChange={(event) => setNewThreadText(event.target.value)}
          />
        </Form.Group>
        {/* <input
            type="text"
            value={newThreadText}
            placeholder="Text (optional)"
            onChange={(event) => setNewThreadText(event.target.value)}
          /> */}
        <input type="submit" value="Add" />
      </form>
    </Box>
  );
}

function Threads(props) {
  // const [newThreadTime, setNewThreadTime] = useState();
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
        {threads.map((thread, index) => (
          <div>
            <p>User: {thread.user}</p>
            <p>Title: {thread.title}</p>
            <p>Text: {thread.text}</p>
            <p>Time: {thread.time}</p>
            <TimeAgo
              date={thread.time}
              formatter={formatter}
              minPeriod="MINUTE"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
