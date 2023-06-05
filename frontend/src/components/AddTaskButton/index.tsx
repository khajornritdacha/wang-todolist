import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function AddTaskButton() {
  return (
    <Link to="/createTask" style={{ textDecoration: "none" }}>
      <div className={styles.container}>
        <p>+</p>
      </div>
    </Link>
  );
}
