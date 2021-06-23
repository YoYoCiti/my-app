import { useAuth } from "../../contexts/AuthContext";
import "./ProfileCard.css";

function ProfileCard() {
  const { currentUser } = useAuth();
  return (
    <div className="main-container">
      <div className="profile-card">
        <div className="profile-card-body">
          <div className="profile-pic">
            Profile Picture currently not supported
          </div>
          <h1 style={{ padding: "1rem 0 1rem 0" }}>My Profile</h1>
          <p>Email: {currentUser.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
