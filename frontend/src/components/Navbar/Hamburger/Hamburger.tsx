import { useState } from "react";
import styles from "./Hamburger.module.css";

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${styles.hamburger} ${open && styles.open}`}
      onClick={handleOpen}
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  );
}
