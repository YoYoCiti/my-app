import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { checkInvalidEntry } from "../../utils/planner-utils";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ModuleBox.css";

function ModuleBox(props) {
  const {
    displayedModule,
    plannedModules,
    setPlannedModules,
    resetModuleBar,
    semSelected,
    displaySearch,
  } = props;
  const { currentUser } = useAuth();
  const [error, setError] = useState({
    disabled: false,
    message: "",
  });

  useEffect(() => {
    if (!plannedModules || !displayedModule || !displayedModule.moduleCode) {
      return;
    }
    const errorState = checkInvalidEntry(
      plannedModules,
      displayedModule,
      semSelected
    );
    setError(errorState);
  }, [displayedModule, plannedModules, semSelected]);

  const [relevantThreads, setRelevantThreads] = useState([]);
  useEffect(() => {
    if (!displayedModule.moduleCode) {
      setRelevantThreads([]);
      return;
    }
    database.tags
      .doc(displayedModule.moduleCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().threads;
        } else {
          return [];
        }
      })
      .then((arr) => {
        if (arr.length <= 3) {
          console.log(arr);
          return arr;
        }
        const newestThreads = arr.slice(Math.max(arr.length - 3, 0));
        return newestThreads;
      })
      .then((arr) =>
        Promise.all(
          arr.map((id) =>
            database.board
              .doc(id)
              .get()
              .then((doc) => {
                return doc.data();
              })
          )
        ).then((results) => {
          console.log(results);
          setRelevantThreads(results);
        })
      );
  }, [displayedModule]);
  // console.log(displayedModule);
  // console.log(displayedModule.moduleCode);

  // useEffect(() =>
  //   database.tags
  //     .doc(displayedModule.moduleCode)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         return doc.data().threads;
  //       }
  //     })
  // );

  function handleAddModule() {
    const newPlannedModules = [
      ...plannedModules.slice(0, semSelected),
      {
        acadSemester: [
          ...plannedModules[semSelected].acadSemester.slice(
            0,
            plannedModules[semSelected].acadSemester.length - 1
          ),
          {
            moduleCode: displayedModule.moduleCode,
            title: displayedModule.title,
            description: displayedModule.description,
            moduleCredit: parseInt(displayedModule.moduleCredit),
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
    resetModuleBar();
    database.users
      .doc(currentUser?.uid)
      .update({ plannedModules: newPlannedModules });
  }
  return (
    <div>
      <p className="module-title">
        {displayedModule.moduleCode + " " + displayedModule.title}
      </p>
      <p className="module-credit">
        {displayedModule.moduleCredit !== -1 &&
          `${displayedModule.moduleCredit}MCs`}
      </p>
      {displayedModule.moduleCode && displaySearch && (
        <>
          <Button
            className="add-module-button"
            variant="info"
            size="sm"
            disabled={error.disabled}
            onClick={handleAddModule}
          >
            Add Module
          </Button>
          <div className="error-box">
            {error.disabled && <Alert variant="warning">{error.message}</Alert>}
          </div>
        </>
      )}
      <p className="module-description">{displayedModule.description}</p>

      <div className="revContainer">
        {relevantThreads[0] &&
          relevantThreads.map((data) => {
            const link = `/board/${data.id}`;
            return (
              <li key={data.id} className="revThread">
                <Link to={link}>{data.title}</Link>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default ModuleBox;
