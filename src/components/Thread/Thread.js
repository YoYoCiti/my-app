import React, { useState } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

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

  function handleAddThread(event) {
    event.preventDefault();
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setNewThreadUser(doc.data().username);
      });
    setNewThreadTime(new Date().toLocaleString());
    addThread(newThreadText, newThreadUser, newThreadTime);
  }

  function addThread(newThreadText, newThreadUser, newThreadTime) {
    const newThreads = [
      ...threads,
      {
        text: newThreadText,
        user: newThreadUser,
        time: newThreadTime,
        // id: "0000",
      },
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
          <div>
            <p>{thread.user}</p>
            <p>{thread.text}</p>
            <p>{thread.time}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
