import { TaskDto } from "../../../../types/dto";
import SingleTask from "../Singletask";
import styles from "./styles.module.css";

interface TaskListProps {
  taskListRef?: React.RefObject<HTMLDivElement> | null;
  date: string;
  tasks: TaskDto[];
}

export default function TaskList({ taskListRef, date, tasks }: TaskListProps) {
  const displayDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className={styles.container} ref={taskListRef}>
      <h1 className={styles.dateText}>{displayDate}</h1>
      {tasks.map((task: TaskDto) => {
        return <SingleTask task={task} />;
      })}
    </div>
  );
}
