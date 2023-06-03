import { useState } from "react";
import styles from "./style.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// TODO: style this page
export default function TaskDetailPage() {
  //   TODO: change const value to props
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState<string>("Wash dishes");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Task: ${taskTitle}`);
    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);
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
            />
            <input
              type="time"
              name=""
              id=""
              className={styles.timeInput}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
}
