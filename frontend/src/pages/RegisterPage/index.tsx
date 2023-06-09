import axios, { AxiosError } from "axios";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ErrorDto } from "../../@types/dto";
import { API_BASE_URL } from "../../env";
import {
  formContainerStyle,
  headingContainerStyle,
  pageContainerStyle,
  registerBtnStyle,
  disableBtnStyle,
} from "./style";
import { useAuth } from "../../hooks/useAuth";
import useCustomTheme from "../../hooks/useCustomTheme";

export default function RegisterPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { theme } = useCustomTheme();
  const { isLoggedIn } = useAuth();
  const history = useHistory();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    if (!email || !password || !passwordConfirm) {
      toast.error("Please complete the form");
      setSubmitting(false);
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      setSubmitting(false);
      return;
    }

    const toastId = toast.loading("Creating account...");
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
      });
      toast.success("Account created!", { id: toastId });
      console.log("Redirect");
      history.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        toast.error(message || "Something went wrong", { id: toastId });
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
        <h2>Register</h2>
      </div>
      <section>
        <form action="" css={formContainerStyle} onSubmit={handleRegister}>
          <input type="email" id="email" ref={emailRef} placeholder="email" />
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="password"
          />
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
            placeholder="confirm password"
          />
          <button
            type="submit"
            css={[registerBtnStyle, isSubmitting && disableBtnStyle]}
            disabled={isSubmitting}
          >
            Register
          </button>
        </form>
        <div>
          <span>Already have account?</span>
          <Link
            to="/login"
            style={{ color: `${theme.isDark ? "white" : "black"}` }}
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
