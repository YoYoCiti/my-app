import React, { useRef } from "react";

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
    </>
  );
}

export default SelectTag;
