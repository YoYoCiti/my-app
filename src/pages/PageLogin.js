import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";

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
        <h2>Sign In</h2>
        <form onSubmit={handleLogIn} action="/action_page.php">
          <div class="form-group">
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
          <div class="form-group">
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
            <Link>Forgot Password?</Link>
          </div>
          {error && <div id="errorMessage">{error}</div>}
          <div>
            <button
              type="submit"
              class="btn btn-default btn-block"
              value="Confirm"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
          <div>
            <span>Don't have an account?</span>
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
