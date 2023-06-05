import { FiLogOut } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { NAVBAR_HEIGHT } from "./constants";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className={styles.navbarContainer} style={{ height: NAVBAR_HEIGHT }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>TodoList</h1>
      </Link>
      <FiLogOut className={styles.icon} onClick={logout} />
    </nav>
  );
}
