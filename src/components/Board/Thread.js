import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import styles from "./Board.module.css";
import Badge from "react-bootstrap/Badge";
import { BiPencil, BiComment, BiTrashAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { database } from "../../config/firebase";

function Thread(props) {
  const { thread, formatter, newThreadUser } = props;
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  function handleClick() {
    history.push(`/board/${thread.id}`);
  }

  function handleEditClick() {
    setEditing(true);
  }

  function deleteThread() {
    database.board
      .doc(thread.id)
      .delete()
      .then(() => console.log("successfully deleted"));
  }

  return (
    <div className={styles.threadBox} key={thread.id}>
      <div className={styles.threadBoxL} onClick={handleClick}>
        <div className={styles.threadUser}>
          Posted by <span>{thread.user}&nbsp;</span>
          <TimeAgo
            date={thread.timeDisplay}
            formatter={formatter}
            minPeriod="MINUTE"
            // className={styles.threadTime}
          />{" "}
          ago
        </div>
        <div className={styles.threadTitle}>{thread.title}</div>
        <div className={styles.threadText}>{thread.content}</div>

        {/* <div className={styles.threadTime}>{thread.timeDisplay}</div> */}
        {thread.tags[0] && (
          <ul className={styles.displayTag}>
            {thread.tags.map((tag, i) => (
              <li>
                <Badge pill variant="info" className="m-auto" key={tag}>
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.threadBoxR}>
        <BiComment className={styles.threadIcon} size={22} />
        {newThreadUser === thread.user && (
          <>
            <BiPencil
              size={22}
              className={styles.threadIcon}
              onClick={handleEditClick}
            />
            <BiTrashAlt
              size={22}
              className={styles.threadIcon}
              onClick={() => setShow(true)}
            />{" "}
          </>
        )}
      </div>
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Body>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Thread;
