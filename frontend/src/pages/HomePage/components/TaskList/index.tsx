import SingleTask from "../Singletask";
import styles from "./styles.module.css";

interface TaskListProps {
  taskListRef?: React.RefObject<HTMLDivElement> | null;
  date: string;
}

export default function TaskList({ taskListRef, date }: TaskListProps) {
  //   const date = "2 Apr - Tomorrow";
  const tasks: any[] = [1, 2, 3, 4, 5];
  return (
    <div className={styles.container} ref={taskListRef}>
      <h1 className={styles.dateText}>{date}</h1>
      {tasks.map((task: any) => {
        console.log(task);
        return <SingleTask />;
      })}
    </div>
  );
}
