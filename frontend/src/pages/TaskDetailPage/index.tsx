import { useState } from "react";
import styles from "./style.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { TaskDto } from "../../types/dto";

// TODO: style this page
export default function TaskDetailPage() {
  //   TODO: change const value to props
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(`ID: ${id}`);
  const task = dummyData;

  const [taskTitle, setTaskTitle] = useState<string>("Wash dishes");
  const [date, setDate] = useState<string>(task.dueDate);
  const [time, setTime] = useState<string>(task.dueTime);

  // TODO: handle submit
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
              id="dueDate"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              id="dueTime"
              className={styles.timeInput}
              value={time}
              required
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

const dummyData = {
  _id: "647d574377651162123d9c35",
  title: "test1",
  dueDate: "2023-06-06",
  dueTime: "00:30",
  isCompleted: false,
  ownerId: "647af96220aef17cdba99151",
  __v: 0,
};
