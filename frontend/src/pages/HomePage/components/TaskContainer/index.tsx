import { useEffect, useRef } from "react";
import TaskList from "../TaskList";
import { NAVBAR_HEIGHT } from "../../../../components/Navbar/constants";
import { TasksApiDto } from "../../../../types/dto";
import styles from "./styles.module.css";
import useFetchTasks from "../../../../hooks/useFetchTasks";

interface TaskContainerProps {
  taskData: TasksApiDto;
  loading: boolean;
  error: boolean;
  fetchTasks: () => Promise<void>;
}

export default function TaskContainer() {
  const todayListRef = useRef<HTMLDivElement>(null);

  const { loading, error, taskData, fetchTasks, fetchCount } = useFetchTasks();

  // TODO: handle scroll
  useEffect(() => {
    if (!todayListRef.current) return;
    if (loading) return;
    if (fetchCount > 1) return;
    window.scrollTo({
      top: todayListRef.current?.offsetTop - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  }, [loading, fetchCount]);

  return (
    <div className={styles.container}>
      {taskData.data.map((taskList) => {
        return (
          <TaskList
            date={taskList.date}
            dayDiff={taskList.dayDiff}
            taskListRef={taskList.dayDiff === 0 ? todayListRef : null}
            tasks={taskList.tasks}
            fetchTasks={fetchTasks}
            key={taskList.date}
          />
        );
      })}
    </div>
  );
}

// TODO: remove dummy data
const dummyData = {
  data: [
    {
      date: "17/05/2023",
      dayDiff: -5,
      tasks: [
        {
          _id: "647d55a377651162123d9c15",
          title: "Test 4",
          dueDate: "17/05/2023",
          dueTime: "17.30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
      ],
    },
    {
      date: "2023-06-06",
      dayDiff: 0,
      tasks: [
        {
          _id: "647d574377651162123d9c35",
          title: "test1",
          dueDate: "2023-06-06",
          dueTime: "00:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d57c177651162123d9c3d",
          title: "test1",
          dueDate: "2023-06-06",
          dueTime: "03:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d582577651162123d9c42",
          title: "test1",
          dueDate: "2023-06-06",
          dueTime: "03:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
      ],
    },
    {
      date: "2023-06-07",
      dayDiff: 1,
      tasks: [
        {
          _id: "647aff5120aef17cdba99158",
          title: "Untitled",
          dueDate: "2023-06-07",
          dueTime: "18:52",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
      ],
    },
    {
      date: "2027-11-05",
      dayDiff: 10,
      tasks: [
        {
          _id: "647d588f77651162123d9c61",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:29",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d589877651162123d9c6a",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:29",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d589977651162123d9c6f",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:29",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d589a77651162123d9c73",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:29",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d586e77651162123d9c54",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d586f77651162123d9c59",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "01:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d583377651162123d9c47",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "03:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
        {
          _id: "647d583477651162123d9c4c",
          title: "test3",
          dueDate: "2027-11-05",
          dueTime: "03:30",
          isCompleted: false,
          ownerId: "647af96220aef17cdba99151",
          __v: 0,
        },
      ],
    },
  ],
};
