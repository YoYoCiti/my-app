import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label for="email">Enter your email:</label>
          <input type="email" name="email" ref={emailRef} />
        </div>
        <div>
          <label for="password">Create password:</label>
          <input type="password" name="password" ref={passwordRef} />
        </div>
        <div>
          <label for="password-confirm">Confirm password:</label>
          <input
            type="password"
            name="password-confirm"
            ref={passwordConfirmRef}
          />
        </div>
        {error && <div id="errorMessage">{error}</div>}
        <div>
          <input type="submit" value="Confirm" disabled={loading} />
          <Link to="/login">
            <input type="button" value="Back to Login" />
          </Link>
        </div>
      </form>
    </>
  );
}

export default PageSignUp;
