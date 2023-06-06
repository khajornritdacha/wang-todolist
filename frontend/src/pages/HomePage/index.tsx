import AddTaskButton from "../../components/AddTaskButton";
import TaskContainer from "./components/TaskContainer";
import { containerStyle } from "./style";

export default function HomePage() {
  return (
    <>
      <div css={containerStyle}>
        <TaskContainer />
        <AddTaskButton />
      </div>
    </>
  );
}
