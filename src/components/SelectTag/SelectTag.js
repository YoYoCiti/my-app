import React, { useRef } from "react";
import { BsX } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import styles from "./SelectTag.module.css";

function SelectTag(props) {
  const tagInput = useRef(null);
  const { tags, setTags } = props;

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

  return (
    <div className={styles.tags}>
      <span>Add Tags:</span>
      <ul className={styles.selectTag}>
        {tags.map((tag, i) => (
          <li>
            <Badge pill variant="info" className="m-auto" key={tag}>
              {tag}{" "}
              {/* <button type="button" onClick={() => removeTag(i)}>
              Remove
            </button> */}
              <BsX
                type="button"
                // style={{ border: "1px solid red" }}
                onClick={() => removeTag(i)}
                className="m-auto"
              />
            </Badge>
          </li>
        ))}

        <li className={styles.tagInput}>
          <input
            type="text"
            onKeyDown={handleAddTag}
            ref={tagInput}
            placeholder="Type in tags (e.g. CS1101S, GER1000) Enter to confirm."
          />
        </li>
      </ul>
    </div>
  );
}

export default SelectTag;
