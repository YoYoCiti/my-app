import React, { useState } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(enStrings);

// in your react component

function Board() {
  return (
    <>
      <button>New Thread</button>
      <Threads />
    </>
  );
}

function Threads() {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadUser, setNewThreadUser] = useState();
  const [newThreadTime, setNewThreadTime] = useState();

  async function handleAddThread(event) {
    event.preventDefault();
    await database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setNewThreadUser(doc.data().username);
      });
    setNewThreadTime(new Date().toLocaleString());
    console.log(newThreadText, newThreadTime, newThreadUser);
    addThread(newThreadText, newThreadUser, newThreadTime);
  }

  function addThread(newThreadText, newThreadUser, newThreadTime) {
    const newThreads = [
      {
        text: newThreadText,
        user: newThreadUser,
        time: newThreadTime,
        // id: "0000",
      },
      ...threads,
    ];
    setThreads(newThreads);
  }
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
          <div style={{ background: "red", margin: "2px" }}>
            <p>{thread.user}</p>
            <p>{thread.text}</p>
            <p>{thread.time}</p>
            <TimeAgo date={thread.time} formatter={formatter} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
