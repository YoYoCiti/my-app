import React, { useState } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
<<<<<<< Updated upstream
=======
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Box from "../Box";
import Form from "react-bootstrap/Form";
>>>>>>> Stashed changes

function Board() {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadUser, setNewThreadUser] = useState();
<<<<<<< Updated upstream
  const [newThreadTime, setNewThreadTime] = useState();
=======
  const [postNewThread, setPostNewThread] = useState(false);
>>>>>>> Stashed changes

  function handleAddThread(event) {
    event.preventDefault();
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setNewThreadUser(doc.data().username);
      });
<<<<<<< Updated upstream
    setNewThreadTime(new Date().toLocaleString());
    addThread(newThreadText, newThreadUser, newThreadTime);
  }

  function addThread(newThreadText, newThreadUser, newThreadTime) {
=======
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
>>>>>>> Stashed changes
    const newThreads = [
      ...threads,
      {
        title: newThreadTitle,
        text: newThreadText,
        user: newThreadUser,
<<<<<<< Updated upstream
        time: newThreadTime,
        // id: "0000",
=======
        time: Time,
        //boardId: "0000",
>>>>>>> Stashed changes
      },
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
<<<<<<< Updated upstream
        <h2> Threads</h2>
        <label>New Thread</label>
        <input
          type="text"
          value={newThreadText}
          onChange={(event) => setNewThreadText(event.target.value)}
        />
        <input type="submit" value="Add" onClick={handleAddThread} />
      </div>
      <div>
        {threads.map((thread, index) => (
          <div>
            <p>{thread.user}</p>
            <p>{thread.text}</p>
            <p>{thread.time}</p>
=======
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
>>>>>>> Stashed changes
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
