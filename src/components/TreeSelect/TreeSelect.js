import React from "react";
import { TreeView } from "@progress/kendo-react-treeview";

function TreeSelect(props) {
  const { alertState } = props;

  const transform = (tree) => {
    if (!tree) {
      return;
    }
    const newTree = tree.map((obj) => {
      return {
        text: typeof obj === "string" ? obj : "or" in obj ? "OR" : "AND",
        expanded: true,
        items:
          typeof obj === "string"
            ? null
            : "or" in obj
            ? transform(obj.or)
            : transform(obj.and),
      };
    });
    return newTree;
  };

  const onItemClick = (event) => {
    event.item.selected = !event.item.selected;
  };

  const onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;
  };
  return (
    <TreeView
      data={transform(alertState.tree)}
      expandIcons={true}
      onExpandChange={onExpandChange}
      aria-multiselectable={true}
      onItemClick={onItemClick}
    />
  );
}
export default TreeSelect;
