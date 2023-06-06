import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  formContainerStyle,
  headingContainerStyle,
  pageContainerStyle,
} from "./style";

export default function LoginPage() {
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Please enter username and password");
      setSubmitting(false);
      return;
    }

    try {
      await login(email, password);
      toast.success("Log in successfully!");
      return <Redirect to="/" />;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <div css={pageContainerStyle}>
      <div css={headingContainerStyle}>
        <h1>Todo List</h1>
        <h2>Login</h2>
      </div>
      <section>
        <form action="" css={formContainerStyle} onSubmit={handleLogin}>
          <input type="email" id="email" ref={emailRef} placeholder="email" />
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
        <div>
          <span>Don't have account?</span>
          <Link to="/register">Register</Link>
        </div>
      </section>
    </div>
  );
}
