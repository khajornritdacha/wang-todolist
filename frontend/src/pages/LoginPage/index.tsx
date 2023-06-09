import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  formContainerStyle,
  headingContainerStyle,
  pageContainerStyle,
  loginBtnStyle,
  disableBtnStyle,
} from "./style";
import useCustomTheme from "../../hooks/useCustomTheme";

export default function LoginPage() {
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const { theme } = useCustomTheme();

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

    const toastId = toast.loading("Logging in...");
    try {
      await login(email, password);
      toast.success("Log in successfully!", { id: toastId });
      history.push("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      toast.error("Something went wrong", { id: toastId });
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
          <button
            type="submit"
            css={[loginBtnStyle, isSubmitting && disableBtnStyle]}
            disabled={isSubmitting}
          >
            Login
          </button>
        </form>
        <div>
          <span>Don't have account?</span>
          <Link
            to="/register"
            style={{ color: `${theme.isDark ? "white" : "black"}` }}
          >
            Register
          </Link>
        </div>
      </section>
    </div>
  );
}
