import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";
import ProfileCard from "../components/ProfileCard";
import ProgressCard from "../components/ProgressCard";
import { Button } from "react-bootstrap";
import firebase from "firebase/app";

function PageMain() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState();
  const [yearOfStudy, setYearOfStudy] = useState();
  const [exemptedModules, setExemptedModules] = useState();
  const [plannedModules, setPlannedModules] = useState();

  useEffect(() => {
    database.users.doc(currentUser?.uid).onSnapshot((doc) => {
      setUsername(doc.data().username);
      setPlannedModules(doc.data().plannedModules);
      const res1 = doc.data().exemptedModules;
      const res2 = doc.data().yearOfStudy;
      if (res1) {
        setExemptedModules(res1);
      } else {
        setExemptedModules([]);
      }

      if (res2) {
        setYearOfStudy(res2);
      } else {
        setYearOfStudy(0);
      }
    });
  }, [currentUser]);

  function handleOnClick() {
    firebase.auth().currentUser.sendEmailVerification();
    return;
  }

  return (
    <div className="planner-backg">
      <div style={{ marginLeft: "2%", width: "60%" }}>
        <ProfileCard
          username={username}
          yearOfStudy={yearOfStudy}
          setYearOfStudy={setYearOfStudy}
          exemptedModules={exemptedModules}
          setExemptedModules={setExemptedModules}
        />
        <ProgressCard
          plannedModules={plannedModules}
          yearOfStudy={yearOfStudy}
        />
      </div>
      <div>
        <Button style={{ margin: "15px" }} onClick={handleOnClick}>
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
}

export default PageMain;
