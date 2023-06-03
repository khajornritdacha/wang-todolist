import useFetchTasks from "../../hooks/useFetchTasks";
import TaskContainer from "./components/TaskContainer";

// TODO: edit backend api
export default function HomePage() {
  const { loading, error, taskData } = useFetchTasks();

  return (
    <>{loading ? <h1>Loading...</h1> : <TaskContainer taskData={taskData} />}</>
  );
}
