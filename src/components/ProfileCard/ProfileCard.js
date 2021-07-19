import { database } from "../../config/firebase";
import "./ProfileCard.css";
import { DropDownButton } from "@progress/kendo-react-buttons";
import { useAuth } from "../../contexts/AuthContext";

function ProfileCard(props) {
  const {
    username,
    yearOfStudy,
    setYearOfStudy,
    exemptedModules,
    setExemptedModules,
  } = props;
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
  ];

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
    setYearOfStudy(index);
    database.users.doc(currentUser?.uid).update({ yearOfStudy: index });
  }

  return (
    <div className="profile-card">
      <div className="profile-card-body">
        <h1 style={{ padding: "0rem 0 1rem 0" }}>My Profile</h1>
        <p>Username: {username}</p>
        <p>Email: {currentUser.email}</p>
        <div>
          <span>
            Year of Study:{" "}
            {`Y${Math.floor(yearOfStudy / 2) + 1}S${
              yearOfStudy % 2 === 0 ? 1 : 2
            }`}
          </span>{" "}
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
