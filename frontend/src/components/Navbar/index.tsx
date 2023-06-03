import { FiLogOut } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { NAVBAR_HEIGHT } from "./constants";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className={styles.navbarContainer} style={{ height: NAVBAR_HEIGHT }}>
      <h1>TodoList</h1>
      <FiLogOut className={styles.icon} onClick={logout} />
    </nav>
  );
}
