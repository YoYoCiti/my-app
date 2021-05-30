import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

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
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
      </head>
      <Container className="justify-content-center" >
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} action="/action_page.php">
        <div>
          <label class="sr-only" for="email">Enter your email:</label>
          <input class="form-control" type="email" name="email" ref={emailRef} placeholder="Enter your email"/>
        </div>
        <div>
          <label class="sr-only" for="password">Create password:</label>
          <input class="form-control" type="password" name="password" ref={passwordRef} placeholder="Create password"/>
        </div>
        <div>
          <label class="sr-only" for="password-confirm">Confirm password:</label>
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
          <input type="submit" value="Confirm" disabled={loading} />
          <Link to="/login">
            <input type="button" value="Back to Login" />
          </Link>
        </div>
      </form>
      </Container>
    </>
  );
}

export default PageSignUp;
