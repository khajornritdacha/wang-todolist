import { FiLogOut } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { NAVBAR_HEIGHT } from "./constants";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer} style={{ height: NAVBAR_HEIGHT }}>
      <h1>TodoList</h1>
      <FiLogOut className={styles.icon} />
    </nav>
  );
}
