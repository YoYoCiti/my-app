import React, { useRef, useState } from "react";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import { Col, Row, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { database } from "../../config/firebase";
import styles from "./FilterBar.module.css";

function FilterBar(props) {
  const tagInput = useRef(null);
  const [tags, setTags] = useState([]);
  const { setFilteredThreads } = props;

  async function handleAddTag(e) {
    const val = e.target.value.toUpperCase();
    if (val && e.key === "Enter") {
      if (tags.length >= 5) {
        return;
      }
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      const allTags = [...tags, val];
      await setTags(allTags);
      tagInput.current.value = null;
    } else if (!val && e.key === "Backspace") {
      removeTag(tags.length - 1);
    }
  }

  function removeTag(i) {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  }

  async function handleFilter() {
    const filtered = _.spread(_.intersection);
    Promise.all(
      tags.map((modCode) =>
        database.tags
          .doc(modCode)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              return;
            }
            return doc.data().threads;
          })
      )
    ).then((results) => {
      getFilteredThreads(filtered(results));
    });
  }

  function getFilteredThreads(threadsId) {
    Promise.all(
      threadsId.map((id) =>
        database.board
          .doc(id)
          .get()
          .then((doc) => {
            return doc.data();
          })
      )
    ).then((results) => setFilteredThreads(results));
  }

  return (
    <>
      <Row>
        <Col sm={5}>
          <Form.Control
            type="text"
            onKeyDown={handleAddTag}
            ref={tagInput}
            placeholder="(e.g. GER1000) Enter to confirm tags"
          />
        </Col>
        <Button onClick={handleFilter} variant="warning">
          Filter by Tags
        </Button>
      </Row>
      <ul className={styles.selectTag}>
        {tags.map((tag, i) => (
          <li key={tag}>
            {tag}{" "}
            <BsX type="button" className="ml-1" onClick={() => removeTag(i)} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FilterBar;
