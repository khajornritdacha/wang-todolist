import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function LoginPage() {
  const handleLogin = () => {
    return;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1>Todo List</h1>
        <h2>Login</h2>
      </div>
      <section className={styles.inputSection}>
        <form action="" className={styles.formContainer} onSubmit={handleLogin}>
          <input type="text" name="" id="" placeholder="email" />
          <input type="password" name="" id="" placeholder="password" />
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
