import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "../components/Box";

function PageSignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create account");
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div class="form-group">
            <label class="sr-only">Enter your email:</label>
            <input
              class="form-control"
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label class="sr-only" for="password">
              Create password:
            </label>
            <input
              class="form-control"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Create password"
              minlength="8"
            />
          </div>
          <div class="form-group">
            <label class="sr-only" for="password-confirm">
              Confirm password:
            </label>
            <input
              class="form-control"
              type="password"
              name="password-confirm"
              ref={passwordConfirmRef}
              placeholder="Confirm password"
            />
          </div>
          {error && <div id="errorMessage">{error}</div>}
          <div>
            <button
              type="submit"
              value="Confirm"
              class="btn btn-default btn-block"
              disabled={loading}
            >
              Create Account
            </button>
          </div>
          <div>
            <span>Already have an account?</span>
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
