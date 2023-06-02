import { useEffect, useRef } from "react";
import TaskList from "../TaskList";
import { NAVBAR_HEIGHT } from "../../../../components/Navbar/constants";

export default function TaskContainer() {
  const todayListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!todayListRef.current) return;
    window.scrollTo({
      top: todayListRef.current?.offsetTop - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  }, []);

  const taskLists: any[] = [1, 2, 3, 4, 5];

  return (
    <div>
      {taskLists.map((taskList) => {
        return (
          <TaskList
            date={taskList}
            taskListRef={taskList === 3 ? todayListRef : null}
          />
        );
      })}
    </div>
  );
}
