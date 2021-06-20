import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import TimeAgo from "react-timeago";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

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
  // const [newThreadTime, setNewThreadTime] = useState();
  const formatter = buildFormatter(enStrings);

  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        const username = doc.data().username;
        setNewThreadUser(username);
      });
  }, [currentUser]);

  async function handleAddThread(event) {
    event.preventDefault();
    const date = Date().toLocaleString();
    addThread(newThreadText, newThreadUser, date);
  }

  function addThread(newThreadText, newThreadUser, Time) {
    const newThreads = [
      {
        text: newThreadText,
        user: newThreadUser,
        time: Time,
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
        <button type="submit" value="Add" onSubmit={handleAddThread} />
      </div>
      <div>
        {threads.map((thread, index) => (
          <div>
            <p>{thread.user}</p>
            <p>{thread.text}</p>
            <p>{thread.time}</p>
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
