import React, { useState, useRef } from "react";
import { database } from "../../config/firebase";
import Box from "../Box";
import Form from "react-bootstrap/Form";
import SelectTag from "../SelectTag";
import styles from "./Board.module.css";
import firebase from "firebase/app";
import "firebase/firestore";

function PostThread(props) {
  const { newThreadUser, setPostNewThread } = props;
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [tags, setTags] = useState([]);
  const currThreadId = useRef(null);

  async function handleAddThread(event) {
    event.preventDefault();
    if (newThreadTitle.length <= 0) {
      return;
    }
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
        createdAt: time.valueOf(),
        timeDisplay: time.toLocaleString(),
        tags: tags,
      })
      .then((docRef) => {
        docRef.update({ id: docRef.id });
        currThreadId.current = docRef.id;
      });
    var batch = database.db.batch();
    tags.forEach((doc) => {
      var docRef = database.tags.doc(doc);
      docRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          docRef.update({
            threads: firebase.firestore.FieldValue.arrayUnion(
              currThreadId.current
            ),
          });
        } else {
          docRef.set({ threads: [currThreadId.current] });
        }
      });
      batch.update(docRef, { doc });
    });
    batch.commit();
  }

  return (
    <Box>
      <div
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3>Create New Thread</h3>
        <Form.Group>
          <Form.Control
            type="text"
            value={newThreadTitle}
            placeholder="Title"
            onChange={(event) => setNewThreadTitle(event.target.value)}
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
        <span>Select Tag:</span>
        <SelectTag tags={tags} setTags={setTags} />
        <br />
        <button
          type="button"
          value="Cancel"
          onClick={() => setPostNewThread(false)}
        >
          Cancel
        </button>
        <button value="Post" type="submit" onClick={handleAddThread}>
          Post
        </button>
      </div>
    </Box>
  );
}

export default PostThread;
