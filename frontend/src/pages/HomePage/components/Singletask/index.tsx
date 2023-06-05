import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { TaskDto } from "../../../../types/dto";
import useDeleteTask from "../../../../hooks/useDeleteTask";
import { toast } from "react-hot-toast";

interface SingleTaskProps {
  task: TaskDto;
  fetchTasks: () => Promise<void>;
}

export default function SingleTask({ task, fetchTasks }: SingleTaskProps) {
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteTask,
  } = useDeleteTask();

  const handleCheck = () => {
    return;
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    if (errorDelete) {
      toast.error("Fail to delete task");
    } else {
      toast.success("Task deleted");
      // TODO: add defer to make delete task more smooth
      await fetchTasks();
    }
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
          disabled={loadingDelete}
        />
        {/* <BiCheckSquare /> */}
      </div>
    </div>
  );
}
