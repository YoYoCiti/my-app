import React from "react";
import { TreeView } from "@progress/kendo-react-treeview";
import TreeItem from "../TreeItem";
import "@progress/kendo-theme-default/dist/all.css";
import "./TreeSelect.css";

function TreeSelect(props) {
  const {
    alertState,
    moduleData,
    plannedModules,
    setPlannedModules,
    setExemptedModules,
  } = props;
  const transform = (tree) => {
    if (!tree) {
      return;
    }
    const newTree = tree.map((obj) => {
      return {
        text:
          typeof obj === "string" ? (
            <TreeItem
              item={obj}
              moduleData={moduleData}
              plannedModules={plannedModules}
              setPlannedModules={setPlannedModules}
              setExemptedModules={setExemptedModules}
            />
          ) : "or" in obj ? (
            "OR"
          ) : (
            "AND"
          ),
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

  const onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;
  };
  return (
    <TreeView
      data={transform(alertState.tree)}
      expandIcons={true}
      onExpandChange={onExpandChange}
      className="tree"
    />
  );
}

export default TreeSelect;
