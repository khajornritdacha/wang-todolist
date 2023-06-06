import { Redirect } from "react-router-dom";
import AddTaskButton from "../../components/AddTaskButton";
import { useAuth } from "../../hooks/useAuth";
import TaskContainer from "./components/TaskContainer";
import { containerStyle } from "./style";

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect to="/login" />;
  return (
    <>
      <div css={containerStyle}>
        <TaskContainer />
        <AddTaskButton />
      </div>
    </>
  );
}
