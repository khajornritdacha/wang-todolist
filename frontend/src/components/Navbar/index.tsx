import Hamburger from "./Hamburger/Hamburger";
import styles from "./Navbar.module.css";
import { SlMagnifier } from "react-icons/sl";
import { NAVBAR_HEIGHT } from "./constants";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer} style={{ height: NAVBAR_HEIGHT }}>
      <Hamburger />
      <h1>TodoList</h1>
      <SlMagnifier />
    </nav>
  );
}
