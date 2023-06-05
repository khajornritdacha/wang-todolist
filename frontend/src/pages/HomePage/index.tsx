import AddTaskButton from "../../components/AddTaskButton";
import useFetchTasks from "../../hooks/useFetchTasks";
import TaskContainer from "./components/TaskContainer";
import styles from "./style.module.css";

// TODO: edit backend api
// TODO: handle errors
export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <TaskContainer />
        <AddTaskButton />
      </div>
    </>
  );
}
