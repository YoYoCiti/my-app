import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import PostThread from "./AddNewThread";
import Threads from "./Threads";
import styles from "./Board.module.css";
import { Button, Col } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FilterBar from "../FilterBar";
import { BsQuestionCircle } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

function Board() {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadUser, setNewThreadUser] = useState();
  const [postNewThread, setPostNewThread] = useState(false);
  const [isVerified, setIsVerified] = useState();
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    setIsVerified(currentUser?.emailVerified);
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
        console.log(data);
        setThreads(data);
      });
  }, []);
  console.log(filteredThreads);
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
      <div>
        <div className={styles.topBar}>
          <Col>
            <FilterBar
              setFilteredThreads={setFilteredThreads}
              className={styles.filterBar}
            />
          </Col>

          <div>
            <Col>
              <Button
                style={{ backgroundColor: "pink", color: " black" }}
                onClick={() => setPostNewThread(true)}
                className={styles.threadButton}
                disabled={!isVerified}
              >
                Create Post
              </Button>{" "}
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 500, hide: 200 }}
                overlay={
                  <Tooltip id="overlay-tooltip">
                    Users can only create posts after verifying their email.
                    Resend verification email in the home page.
                  </Tooltip>
                }
              >
                <BsQuestionCircle />
              </OverlayTrigger>
            </Col>
          </div>
        </div>
        {/* 
        {postNewThread && (
          <PostThread
            threads={threads}
            setThreads={setThreads}
            newThreadUser={newThreadUser}
            setPostNewThread={setPostNewThread}
          />
        )} */}

        {filteredThreads === "nil" ? (
          "No relevant threads"
        ) : (
          <Threads
            threads={filteredThreads[0] ? filteredThreads : threads}
            isVerified={isVerified}
            newThreadUser={newThreadUser}
            // styles={styles}
          />
        )}
      </div>

      <Modal
        centered
        show={postNewThread}
        onHide={() => setPostNewThread(false)}
      >
        <PostThread
          threads={threads}
          setThreads={setThreads}
          newThreadUser={newThreadUser}
          setPostNewThread={setPostNewThread}
        />
        {/* <Modal.Body>
          Are you sure you want to delete this thread? This action cannot be
          undone.{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteThread}>
            Delete
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Board;
