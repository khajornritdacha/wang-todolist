import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { TaskDto } from "../../../../types/dto";

interface SingleTaskProps {
  task: TaskDto;
}

export default function SingleTask({ task }: SingleTaskProps) {
  const handleCheck = () => {
    return;
  };

  const handleDelete = () => {
    return;
  };

  return (
    <div className={styles.container}>
      <Link
        to={`/task/${task._id}`}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <div className={styles.textContainer}>
          <h3>{task.title}</h3>
          <p>{task.dueTime}</p>
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
