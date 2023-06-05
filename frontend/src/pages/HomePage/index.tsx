import AddTaskButton from "../../components/AddTaskButton";
import useFetchTasks from "../../hooks/useFetchTasks";
import TaskContainer from "./components/TaskContainer";
import styles from "./style.module.css";

// TODO: edit backend api
// TODO: handle errors
export default function HomePage() {
  const { loading, error, taskData, fetchTasks } = useFetchTasks();

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <TaskContainer
            taskData={taskData}
            loading={loading}
            error={error}
            fetchTasks={fetchTasks}
          />
          <AddTaskButton />
        </div>
      )}
    </>
  );
}
