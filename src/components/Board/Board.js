import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import PostThread from "./AddNewThread";
import Threads from "./Threads";
// import styles from "./Board.module.css";
import FilterBar from "../FilterBar";

function Board() {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadUser, setNewThreadUser] = useState();
  const [postNewThread, setPostNewThread] = useState(false);
  const [isVerified, setIsVerified] = useState();
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    setIsVerified(currentUser.emailVerified);
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
  console.log(filteredThreads);
  return (
    <>
      <FilterBar setFilteredThreads={setFilteredThreads} />
      <button onClick={() => setPostNewThread(true)} disabled={false}>
        Create Post
      </button>

      {postNewThread && (
        <PostThread
          threads={threads}
          setThreads={setThreads}
          newThreadUser={newThreadUser}
          setPostNewThread={setPostNewThread}
        />
      )}
      <Threads
        threads={filteredThreads[0] ? filteredThreads : threads}
        isVerified={isVerified}
        newThreadUser={newThreadUser}
        // styles={styles}
      />
    </>
  );
}

export default Board;
