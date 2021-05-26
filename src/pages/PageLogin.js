import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function PageLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogIn(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (caughtError) {
      setError(caughtError.message);
    }
    setLoading(false);
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleLogIn}>
        <div>
          <label for="email">Enter email:</label>
          <input type="email" name="email" ref={emailRef} />
        </div>
        <div>
          <label for="password">Enter password:</label>
          <input type="password" name="password" ref={passwordRef} />
        </div>
        {error && <div id="errorMessage">{error}</div>}
        <div>
          <input type="submit" value="Confirm" disabled={loading} />
          <Link to="/signup">
            <input type="button" value="Create Account" />
          </Link>
        </div>
      </form>
    </>
  );
}

export default PageLogin;
