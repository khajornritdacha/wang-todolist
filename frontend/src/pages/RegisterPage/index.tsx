import styles from "./styles.module.css";

import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ErrorDto } from "../../@types/dto";
import { API_BASE_URL } from "../../env";

export default function RegisterPage() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);

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

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
      });
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        toast.error(message || "Something went wrong");
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1>Todo List</h1>
        <h2>Register</h2>
      </div>
      <section className={styles.inputSection}>
        <form
          action=""
          className={styles.formContainer}
          onSubmit={handleRegister}
        >
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
          <button type="submit">Register</button>
        </form>
        <div className={styles.registerText}>
          <span>Already have account?</span>
          <Link to="/login">Login</Link>
        </div>
      </section>
    </div>
  );
}
