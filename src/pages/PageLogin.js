import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

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
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Box>
        <h2 className="login-header">Sign In</h2>
        <form
          onSubmit={handleLogIn}
          action="/action_page.php"
          className="login-form"
        >
          <div>
            <label class="sr-only" for="email">
              Enter email:
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              id="email"
              name="email"
              ref={emailRef}
            />
          </div>
          <div>
            <label class="sr-only" for="password">
              Enter password:
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
              name="password"
              ref={passwordRef}
            />
            <Link className="login-resetpwd">Forgot Password?</Link>
          </div>
          <div className="submit-area">
            {error && <div id="errorMessage">{error}</div>}
            <button
              type="submit"
              className="login-btn"
              value="Confirm"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
          <div>
            <span>Don't have an account?&nbsp;</span>
            <Link to="/signup" value="Create Account">
              Create one
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
}

export default PageLogin;
