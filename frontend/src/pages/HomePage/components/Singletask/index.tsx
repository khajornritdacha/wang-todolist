import { toast } from "react-hot-toast";
import { BiCheckSquare, BiSquare } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import useDeleteTask from "../../../../hooks/useDeleteTask";
import useEditTask from "../../../../hooks/useEditTask";
import { TaskDto } from "../../../../types/dto";
import styles from "./styles.module.css";

interface SingleTaskProps {
  task: TaskDto;
  fetchTasks: () => Promise<void>;
}

// TODO: add delete animation
export default function SingleTask({ task, fetchTasks }: SingleTaskProps) {
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteTask,
  } = useDeleteTask();

  const { loading: loadingEdit, error: errorEdit, editTask } = useEditTask();

  const handleCheck = async () => {
    const toastId = toast.loading("Updating task...");
    await editTask({ ...task, isCompleted: !task.isCompleted });
    if (errorEdit) {
      toast.error("Fail to update task", { id: toastId });
    } else {
      // TODO: add defer to make update task more smooth
      toast.success("Task updated", { id: toastId });
      await fetchTasks();
    }
    return;
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting task...");
    await deleteTask(task._id);
    if (errorDelete) {
      toast.error("Fail to delete task", { id: toastId });
    } else {
      toast.success("Task deleted", { id: toastId });
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
        <div
          className={styles.textContainer}
          style={{
            textDecoration: task.isCompleted ? "line-through" : "inherit",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.dueTime}</p>
        </div>
      </Link>
      <div className={styles.iconContainer}>
        {task.isCompleted ? (
          <BiCheckSquare
            className={styles.icon}
            onClick={handleCheck}
            styles={{ cursor: loadingDelete ? "not-allowed" : "pointer" }}
          />
        ) : (
          <BiSquare
            className={styles.icon}
            onClick={handleCheck}
            styles={{ cursor: loadingDelete ? "not-allowed" : "pointer" }}
          />
        )}
        <MdOutlineDeleteOutline
          className={`${styles.icon} ${styles.deleteIcon}`}
          styles={{ cursor: loadingDelete ? "not-allowed" : "pointer" }}
          onClick={handleDelete}
          disabled={loadingDelete}
        />
      </div>
    </div>
  );
}
