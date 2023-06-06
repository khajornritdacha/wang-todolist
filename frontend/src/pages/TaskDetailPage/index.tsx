import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams, Redirect, Prompt } from "react-router-dom";
import useEditTask from "../../hooks/useEditTask";
import useFetchSingleTask from "../../hooks/useFetchSingleTask";
import { useUnsavedChangesWarning } from "../../hooks/useUnsavedChangesWarning";
import styles from "./style.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function TaskDetailPage() {
  const { id } = useParams() as { id: string };
  const { loading, error, task, fetchTask } = useFetchSingleTask(id as string);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    editTask,
  } = useEditTask();
  const { isLoggedIn } = useAuth();

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const [isDirty, setIsDirty] = useState<boolean>(false);

  // When reload page, prompt user when there are unsaved changes
  useUnsavedChangesWarning(isDirty);

  // Initialize input value
  useEffect(() => {
    if (task !== undefined) {
      if (titleRef.current !== null) {
        titleRef.current.value = task.title;
      }
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

    if (loadingUpdate) return;

    titleRef.current.disabled = true;
    dateRef.current.disabled = true;
    timeRef.current.disabled = true;
    // console.log(`Task: ${titleRef.current?.value}`);
    // console.log(`Date: ${dateRef.current?.value}`);
    // console.log(`Time: ${timeRef.current?.value}`);

    if (task !== undefined) {
      const toastId = toast.loading("Updating task...");
      await editTask({
        ...task,
        title,
        dueDate: date,
        dueTime: time,
      });

      if (errorUpdate) {
        toast.error("Fail to update task", { id: toastId });
      } else {
        setIsDirty(false);
        toast.success("Task updated", { id: toastId });
      }
    }

    titleRef.current.disabled = false;
    dateRef.current.disabled = false;
    timeRef.current.disabled = false;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error("Error in fetching task");
    return <Redirect to="/" />;
  }

  if (!isLoggedIn) return <Redirect to="/login" />;
  return (
    <div className={styles.pageContainer}>
      {/* When go back, prompt user to discard changes */}
      <Prompt when={isDirty} message={"Changes you made may not be saved."} />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.subFormContainer}>
          <h2>Task</h2>
          <input
            type="text"
            id="taskTitle"
            required
            ref={titleRef}
            onChange={(e) => {
              setIsDirty(e.target.value !== task?.title);
            }}
          />
        </div>
        <div className={styles.subFormContainer}>
          <h2>Due Date</h2>
          <div className={styles.inputContainer}>
            <input
              type="date"
              id="dueDate"
              required
              ref={dateRef}
              onChange={(e) => {
                setIsDirty(e.target.value !== task?.dueDate);
              }}
            />
            <input
              type="time"
              id="dueTime"
              required
              ref={timeRef}
              onChange={(e) => {
                setIsDirty(e.target.value !== task?.dueTime);
              }}
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
            className={`${styles.saveBtn} ${
              loadingUpdate && styles.disableBtn
            }`}
            disabled={loadingUpdate}
          >
            Save
          </button>
        </div>
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
