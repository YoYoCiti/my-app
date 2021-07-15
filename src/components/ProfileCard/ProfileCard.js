import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../config/firebase";
import "./ProfileCard.css";
import { DropDownButton } from "@progress/kendo-react-buttons";

function ProfileCard() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState();
  const [exemptedModules, setExemptedModules] = useState();

  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
      });
    database.users.doc(currentUser?.uid).onSnapshot((doc) => {
      const res = doc.data().exemptedModules;
      if (res) {
        setExemptedModules(res);
      } else {
        setExemptedModules([]);
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

  return (
    <div className="main-container">
      <div className="profile-card">
        <div className="profile-card-body">
          <div className="profile-pic">
            Profile Picture currently not supported
          </div>
          <h1 style={{ padding: "1rem 0 1rem 0" }}>My Profile</h1>
          <p>Username: {username}</p>
          <p>Email: {currentUser.email}</p>
          <div>
            <DropDownButton
              text="Remove my Exempted/Precluded Modules"
              primary={true}
              items={exemptedModules}
              disabled={!exemptedModules || exemptedModules.length === 0}
              onItemClick={(event) =>
                handleRemoveExemptedModule(event.itemIndex)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
