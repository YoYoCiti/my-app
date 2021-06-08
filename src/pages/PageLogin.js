import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

function PageLogin() {
  const history = useHistory();
  const { login } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleOnChange = (event) =>
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  async function handleLogIn(event) {
    event.preventDefault();

    try {
      setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
      await login(formState.email, formState.password);
      history.push("/");
    } catch (caughtError) {
      setFormState((prevState) => ({
        ...prevState,
        error: caughtError.message,
      }));
    } finally {
      setFormState((prevState) => ({ ...prevState, loading: false }));
    }
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
              value={formState.email}
              onChange={handleOnChange}
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
              value={formState.password}
              onChange={handleOnChange}
            />
            <Link className="login-resetpwd">Forgot Password?</Link>
          </div>
          <div className="submit-area">
            {formState.error && <div id="errorMessage">{formState.error}</div>}
            <button
              type="submit"
              className="login-btn"
              value="Confirm"
              disabled={formState.loading}
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
