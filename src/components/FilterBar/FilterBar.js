import React, { useRef, useState } from "react";
import _ from "lodash";
import { database } from "../../config/firebase";

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
      {tags.map((tag, i) => (
        <ul>
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              Remove
            </button>
          </li>
        </ul>
      ))}
      <input type="text" onKeyDown={handleAddTag} ref={tagInput} />
      <button onClick={handleFilter}>Filter by Tags</button>
    </>
  );
}

export default FilterBar;
