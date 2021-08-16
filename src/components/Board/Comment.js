import React, { useState } from "react";
import TimeAgo from "react-timeago";
import styles from "./Board.module.css";
import { BiTrashAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { database } from "../../config/firebase";

function Comment(props) {
  const { thread, formatter, newPostUser } = props;
  const [show, setShow] = useState(false);

  function deleteComment() {
    database.board
      .doc(thread.threadId)
      .collection("post")
      .doc(thread.postId)
      .delete()
      .then(() => console.log("successfully deleted comment"));
  }
  return (
    <div className={styles.threadBox} key={thread.id}>
      <div className={styles.threadBoxL}>
        <div className={styles.threadUser}>
          {thread.user}&nbsp;
          <TimeAgo
            date={thread.timeDisplay}
            formatter={formatter}
            minPeriod="MINUTE"
            className={styles.threadTime}
          />{" "}
        </div>
        {/* <div className={styles.threadTitle}>{thread.title}</div> */}
        <div className={styles.threadText}>{thread.content}</div>
      </div>
      {newPostUser === thread.user && (
        <div className={styles.threadBoxR}>
          <BiTrashAlt
            size={22}
            className={styles.threadIcon}
            onClick={() => setShow(true)}
          />{" "}
        </div>
      )}
      {/* <div className={styles.threadTime}>{thread.timeDisplay}</div> */}
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          Are you sure you want to delete this thread? This action cannot be
          undone.{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteComment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Comment;
