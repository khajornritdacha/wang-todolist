import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useCreateTask from "../../hooks/useCreateTask";
import styles from "./style.module.css";

// TODO: style this page
export default function CreateNewTaskPage() {
  //   TODO: change const value to props
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState<string>("Untitled");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const { error, createTask } = useCreateTask();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Task: ${taskTitle}`);
    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);

    if (!taskTitle || !date || !time) {
      toast.error("Please enter all details");
      return;
    }
    await createTask(taskTitle, date, time);

    if (error) {
      toast.error("Error in creating tasks, please submit again");
      return;
    }
    toast.success("Create task successfully");
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      {/* TODO: style arrow */}
      <AiOutlineArrowLeft onClick={() => navigate("/")} />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <h3>Task</h3>
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <h3>Due Date</h3>
          <div>
            <input
              type="date"
              name=""
              id=""
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              name=""
              id=""
              className={styles.timeInput}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.saveBtn}>
          Create Task
        </button>
      </form>
    </div>
  );
}
