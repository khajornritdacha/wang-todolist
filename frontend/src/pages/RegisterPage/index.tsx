import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function RegisterPage() {
  const handleRegister = () => {
    return;
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
          <input type="text" name="" id="" placeholder="email" />
          <input type="password" name="" id="" placeholder="password" />
          <input
            type="password"
            name=""
            id=""
            placeholder="repeat your password"
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
