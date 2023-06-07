import { TaskDto } from "../../../../@types/dto";
import SingleTask from "../Singletask";
import styles from "./styles.module.css";

interface TaskListProps {
  taskListRef?: React.RefObject<HTMLDivElement> | null;
  date: string;
  tasks: TaskDto[];
  dayDiff: number;
  fetchTasks: () => Promise<void>;
}

export default function TaskList({
  taskListRef,
  date,
  tasks,
  dayDiff,
  fetchTasks,
}: TaskListProps) {
  let displayDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (dayDiff === 0) {
    displayDate += " (Today)";
  }

  return (
    <div className={styles.container} ref={taskListRef}>
      <h1 className={styles.dateText}>{displayDate}</h1>
      {tasks.map((task: TaskDto) => {
        return (
          <SingleTask task={task} fetchTasks={fetchTasks} key={task._id} />
        );
      })}
    </div>
  );
}
