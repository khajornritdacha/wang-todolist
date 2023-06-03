import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitting(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(email, password);

    if (!email || !password) {
      toast.error("Please enter username and password");
      setSubmitting(false);
      return;
    }

    try {
      await login(email, password);
      toast.success("Log in successfully!");
      navigate("/");
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1>Todo List</h1>
        <h2>Login</h2>
      </div>
      <section className={styles.inputSection}>
        <form action="" className={styles.formContainer} onSubmit={handleLogin}>
          <input type="email" id="email" ref={emailRef} placeholder="email" />
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
        <div className={styles.registerText}>
          <span>Don't have account?</span>
          <Link to="/register">Register</Link>
        </div>
      </section>
    </div>
  );
}
