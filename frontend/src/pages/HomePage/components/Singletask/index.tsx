import { toast } from "react-hot-toast";
import { BiCheckSquare, BiSquare } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import useDeleteTask from "../../../../hooks/useDeleteTask";
import useEditTask from "../../../../hooks/useEditTask";
import { TaskDto } from "../../../../types/dto";
import styles from "./styles.module.css";
import { useState } from "react";

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
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleCheck = async () => {
    if (loadingEdit) return;
    const toastId = toast.loading("Updating task...");
    await editTask({ ...task, isCompleted: !task.isCompleted });
    if (errorEdit) {
      toast.error("Fail to update task", { id: toastId });
    } else {
      toast.success("Task updated", { id: toastId });
      await fetchTasks();
    }
    return;
  };

  const handleDelete = async () => {
    if (loadingDelete) return;
    setIsDeleted(true);
    const toastId = toast.loading("Deleting task...");
    await deleteTask(task._id);
    if (errorDelete) {
      toast.error("Fail to delete task", { id: toastId });
    } else {
      toast.success("Task deleted", { id: toastId });
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
            styles={{ cursor: loadingEdit ? "not-allowed" : "pointer" }}
          />
        ) : (
          <BiSquare
            className={styles.icon}
            onClick={handleCheck}
            styles={{ cursor: loadingEdit ? "not-allowed" : "pointer" }}
          />
        )}
        <MdOutlineDeleteOutline
          className={`${styles.icon} ${styles.deleteIcon} ${
            isDeleted && styles.disabled
          }}`}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
