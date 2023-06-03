import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSquare, BiCheckSquare } from "react-icons/bi";

// TODO: change link
// TODO: change props

export default function SingleTask() {
  const title = "hello world";
  const dueTime = "10.00 PM";

  const handleCheck = () => {
    return;
  };

  const handleDelete = () => {
    return;
  };

  return (
    <div className={styles.container}>
      <Link to="/task" style={{ textDecoration: "none", width: "100%" }}>
        <div className={styles.textContainer}>
          <h3>{title}</h3>
          <p>{dueTime}</p>
        </div>
      </Link>
      <div className={styles.iconContainer}>
        <BiSquare className={styles.icon} onClick={handleCheck} />
        <MdOutlineDeleteOutline
          className={styles.icon}
          onClick={handleDelete}
        />
        {/* <BiCheckSquare /> */}
      </div>
    </div>
  );
}
