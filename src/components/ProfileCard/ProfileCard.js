import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../config/firebase";
import "./ProfileCard.css";
import { DropDownButton } from "@progress/kendo-react-buttons";

function ProfileCard() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState();
  const [yearOfStudy, setYearOfStudy] = useState();
  const [exemptedModules, setExemptedModules] = useState();
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

  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
      });
    database.users.doc(currentUser?.uid).onSnapshot((doc) => {
      const res1 = doc.data().exemptedModules;
      const res2 = doc.data().yearOfStudy;
      if (res1) {
        setExemptedModules(res1);
      } else {
        setExemptedModules([]);
      }

      if (res2) {
        setYearOfStudy(
          `Y${Math.floor(res2 / 2) + 1}S${res2 % 2 === 0 ? 1 : 2}`
        );
      } else {
        setYearOfStudy("Y1S1");
      }
    });
  }, [currentUser]);

  function handleRemoveExemptedModule(index) {
    const newExemptedModules = [
      ...exemptedModules.slice(0, index),
      ...exemptedModules.slice(index + 1),
    ];
    setExemptedModules(newExemptedModules);
    database.users
      .doc(currentUser?.uid)
      .update({ exemptedModules: newExemptedModules });
  }

  function handleChangeYOS(index) {
    setYearOfStudy(`Y${Math.floor(index / 2) + 1}S${index % 2 === 0 ? 1 : 2}`);
    database.users.doc(currentUser?.uid).update({ yearOfStudy: index });
  }

  return (
    <div className="profile-card">
      <div className="profile-card-body">
        <div className="profile-pic">
          Profile Picture currently not supported
        </div>
        <h1 style={{ padding: "1rem 0 1rem 0" }}>My Profile</h1>
        <p>Username: {username}</p>
        <p>Email: {currentUser.email}</p>
        <div>
          <span>Year of Study: {yearOfStudy}</span>{" "}
          <DropDownButton
            text="Change"
            primary={true}
            items={dropdownItems}
            onItemClick={(event) => handleChangeYOS(event.itemIndex)}
          />
        </div>
        <br />
        <div>
          <DropDownButton
            text="Remove my Exempted/Precluded Modules"
            primary={true}
            items={exemptedModules}
            disabled={!exemptedModules || exemptedModules.length === 0}
            onItemClick={(event) => handleRemoveExemptedModule(event.itemIndex)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
