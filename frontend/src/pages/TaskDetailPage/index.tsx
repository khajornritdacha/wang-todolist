import { useEffect, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import useFetchSingleTask from "../../hooks/useFetchSingleTask";
import styles from "./style.module.css";
import { toast } from "react-hot-toast";
import useEditTask from "../../hooks/useEditTask";

// TODO: style this page
export default function TaskDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, task } = useFetchSingleTask(id as string);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    editTask,
  } = useEditTask();

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  // Initialize input value
  useEffect(() => {
    if (task !== undefined) {
      if (titleRef.current !== null) titleRef.current.value = task.title;
      if (dateRef.current !== null) dateRef.current.value = task.dueDate;
      if (timeRef.current !== null) timeRef.current.value = task.dueTime;
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const date = dateRef.current?.value;
    const time = timeRef.current?.value;

    if (!title || !date || !time) {
      toast.error("Please fill all details");
      return;
    }

    // console.log(`Task: ${titleRef.current?.value}`);
    // console.log(`Date: ${dateRef.current?.value}`);
    // console.log(`Time: ${timeRef.current?.value}`);

    if (task !== undefined) {
      await editTask({
        ...task,
        title,
        dueDate: date,
        dueTime: time,
      });

      if (errorUpdate) {
        toast.error("Fail to update task");
      } else {
        toast.success("Task updated");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error("Error in fetching task");
    navigate("/");
  }

  return (
    <div className={styles.pageContainer}>
      {/* TODO: style arrow */}
      <AiOutlineArrowLeft onClick={() => navigate("/")} />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <h3>Task</h3>
          <input type="text" id="taskTitle" required ref={titleRef} />
        </div>
        <div>
          <h3>Due Date</h3>
          <div>
            <input type="date" id="dueDate" required ref={dateRef} />
            <input
              type="time"
              id="dueTime"
              className={styles.timeInput}
              required
              ref={timeRef}
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={loadingUpdate}
        >
          Save
        </button>
      </form>
    </div>
  );
}

// TODO: remove dummy data
const dummyData = {
  _id: "647d574377651162123d9c35",
  title: "test1",
  dueDate: "2023-06-06",
  dueTime: "00:30",
  isCompleted: false,
  ownerId: "647af96220aef17cdba99151",
  __v: 0,
};
