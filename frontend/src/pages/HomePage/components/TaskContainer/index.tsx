import { useEffect, useRef } from "react";
import TaskList from "../TaskList";
import { NAVBAR_HEIGHT } from "../../../../components/Navbar/constants";
import { TaskDataDto } from "../../../../types/dto";

interface TaskContainerProps {
  taskData: TaskDataDto;
}

export default function TaskContainer({ taskData }: TaskContainerProps) {
  const todayListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!todayListRef.current) return;
    window.scrollTo({
      top: todayListRef.current?.offsetTop - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  }, []);

  const today = "6/3/2023";

  return (
    <div>
      {taskData.data.map((taskList) => {
        return (
          <TaskList
            date={taskList.date}
            taskListRef={taskList.date === today ? todayListRef : null}
            tasks={taskList.tasks}
          />
        );
      })}
    </div>
  );
}
