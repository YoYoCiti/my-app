import { DropDownButton } from "@progress/kendo-react-buttons";
import { Button } from "react-bootstrap";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { checkInvalidEntry } from "../../utils/planner-utils";
import "./TreeItem.css";

function TreeItem(props) {
  const { item, moduleData, plannedModules, setPlannedModules } = props;
  const { currentUser } = useAuth();
  const dropdownItems = [
    "Y1S1",
    "Y1S2",
    "Y2S1",
    "Y2S2",
    "Y3S1",
    "Y3S2",
    "Y4S1",
    "Y4S2",
  ].filter(
    (sem, index) =>
      !checkInvalidEntry(
        plannedModules,
        moduleData.find((elem) => elem.moduleCode === item),
        index
      ).disabled
  );

  function handleAddModule(semSelected) {
    const module = moduleData.find((elem) => elem.moduleCode === item);
    const newPlannedModules = [
      ...plannedModules.slice(0, semSelected),
      {
        acadSemester: [
          ...plannedModules[semSelected].acadSemester.slice(
            0,
            plannedModules[semSelected].acadSemester.length - 1
          ),
          {
            moduleCode: module.moduleCode,
            title: module.title,
            description: module.description,
          },
          {
            moduleCode: "",
            title: "Add Modules",
          },
        ],
      },
      ...plannedModules.slice(semSelected + 1),
    ];

    setPlannedModules(newPlannedModules);
    database.users
      .doc(currentUser?.uid)
      .update({ plannedModules: newPlannedModules });
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

export default TreeItem;
