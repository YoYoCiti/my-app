import React from "react";
import { TreeView } from "@progress/kendo-react-treeview";
import { DropDownButton } from "@progress/kendo-react-buttons";
import { Button } from "react-bootstrap";
import "@progress/kendo-theme-default/dist/all.css";
import "./TreeSelect.css";

function TreeSelect(props) {
  const { alertState } = props;
  const transform = (tree) => {
    if (!tree) {
      return;
    }
    const newTree = tree.map((obj) => {
      return {
        text:
          typeof obj === "string" ? (
            <TreeItem item={obj} />
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

function TreeItem(props) {
  const { item } = props;
  const dropdownItems = [
    "Y1S1",
    "Y1S2",
    "Y2S1",
    "Y2S2",
    "Y3S1",
    "Y3S2",
    "Y4S1",
    "Y4S2",
  ];

  function handleAddModule(sem) {
    console.log(sem);
  }

  return (
    <div className="item-container">
      <span className="item">{item}</span>
      <DropDownButton
        text="Add Module"
        className="tree-item-button"
        primary={true}
        items={dropdownItems}
        onItemClick={(event) => handleAddModule(event.itemIndex)}
      />
      <Button variant="secondary" className="tree-item-button" size="sm">
        Exempt/Took Equivalent
      </Button>
    </div>
  );
}

export default TreeSelect;
