import { useEffect, useState } from "react";
import { TaskDataDto } from "../types/dto";
import { api } from "../utils/axios";

const useFetchTasks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [taskData, setTaskData] = useState<TaskDataDto>({ data: [] });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = (await api.get(`/api/tasks`)) as TaskDataDto;
        setTaskData(res);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return { loading, error, taskData };
};

export default useFetchTasks;
