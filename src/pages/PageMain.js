import ProfileCard from "../components/ProfileCard";
import ProgressCard from "../components/ProgressCard";

function PageMain() {
  return (
    <div className="planner-backg">
      <div className="main-container">
        <ProfileCard />
        <ProgressCard />
      </div>
    </div>
  );
}

export default PageMain;
