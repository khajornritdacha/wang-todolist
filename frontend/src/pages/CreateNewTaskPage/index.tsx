import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useCreateTask from "../../hooks/useCreateTask";
import styles from "./style.module.css";

// TODO: style this page
export default function CreateNewTaskPage() {
  const [taskTitle, setTaskTitle] = useState<string>("Untitled");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const { error, loading, createTask } = useCreateTask();

  // TODO: clear input after successfully submit
  // TODO: add disable button when submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(`Task: ${taskTitle}`);
    // console.log(`Date: ${date}`);
    // console.log(`Time: ${time}`);

    if (loading) return;

    if (!taskTitle || !date || !time) {
      toast.error("Please enter all details");
      return;
    }
    const toastId = toast.loading("Creating task...");
    await createTask(taskTitle, date, time);

    if (error) {
      toast.error("Error in creating tasks", {
        id: toastId,
      });
      return;
    }
    toast.success("Create task successfully", { id: toastId });
    setTaskTitle("Untitled");
    setDate("");
    setTime("");
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.subFormContainer}>
          <h2>Task</h2>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.subFormContainer}>
          <h2>Due Date</h2>
          <div className={styles.inputContainer}>
            <input
              type="date"
              id="dueDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              id="dueTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              className={`${styles.saveBtn}`}
              style={{ backgroundColor: "grey", color: "white" }}
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            className={`${styles.saveBtn} ${loading && styles.disableBtn}`}
            disabled={loading}
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
