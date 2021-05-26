import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function PageMain() {
  const { signout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogOut() {
    setError("");
    try {
      await signout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <h1>Hello World</h1>
      <p>Current logged in user email: {currentUser.email}</p>
      {error && <div id="errorMessage">{error}</div>}
      <input type="button" value="Sign Out" onClick={handleLogOut} />
    </>
  );
}

export default PageMain;
