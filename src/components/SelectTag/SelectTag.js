import React, { useRef } from "react";
import { BsX } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import styles from "./SelectTag.module.css";
import { lightGreen } from "@material-ui/core/colors";
import { TextareaAutosize } from "@material-ui/core";

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
      <ul className={styles.selectTag}>
        {tags.map((tag, i) => (
          <li>
            <Badge pill variant="info" key={tag}>
              {tag}
              {/* <button type="button" onClick={() => removeTag(i)}>
              Remove
            </button> */}
              <BsX tyle="button" onClick={() => removeTag(i)} />
            </Badge>
          </li>
        ))}

        <li className={styles.tagInput}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 500, hide: 200 }}
            overlay={<Tooltip id="overlay-tooltip">hover</Tooltip>}
            disabled
          >
            <input type="text" onKeyDown={handleAddTag} ref={tagInput} />
          </OverlayTrigger>
        </li>
      </ul>
    </div>
  );
}

export default SelectTag;
