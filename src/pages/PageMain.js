import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar/Sidebar";

function PageMain() {
  const { currentUser } = useAuth();

  return (
    <>
      <Sidebar />
      <div className="temp-text">
        <h1>Hello World</h1>
        <p>Current logged in user email: {currentUser.email}</p>
      </div>
    </>
  );
}

export default PageMain;
