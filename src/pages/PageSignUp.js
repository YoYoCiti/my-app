import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";
import "./login-style.css";

function PageSignUp() {
  const history = useHistory();
  const { signup } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
  });

  const handleOnChange = (event) =>
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  async function handleSignUp(event) {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      return setFormState((prevState) => ({
        ...prevState,
        error: "Passwords do not match",
      }));
    }

    try {
      setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
      await signup(formState.email, formState.password);
      history.push("/");
    } catch {
      setFormState((prevState) => ({
        ...prevState,
        error: "Failed to create account",
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
        <h2 className="login-header">Sign Up</h2>
        <form onSubmit={handleSignUp} className="login-form">
          <div>
            <label class="sr-only">Enter your email:</label>
            <input
              class="form-control"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="sr-only" for="password">
              Create password:
            </label>
            <input
              class="form-control"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleOnChange}
              placeholder="Create password"
              minlength="8"
            />
          </div>
          <div>
            <label class="sr-only" for="confirmPassword">
              Confirm password:
            </label>
            <input
              class="form-control"
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="submit-area">
            {formState.error && <div id="errorMessage">{formState.error}</div>}

            <button
              type="submit"
              className="login-btn"
              disabled={formState.loading}
            >
              Create Account
            </button>
          </div>
          <div>
            <span>Already have an account?&nbsp;</span>
            <Link to="/login" value="Back to Login">
              Log in
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
}

export default PageSignUp;
