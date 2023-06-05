import { useEffect, useState } from "react";
import { TasksApiDto } from "../types/dto";
import { api } from "../utils/axios";

const useFetchTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [taskData, setTaskData] = useState<TasksApiDto>({ data: [] });
  const [fetchCount, setFetchCount] = useState(0);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = (await api.get(`/api/tasks`)).data as TasksApiDto;
      setFetchCount(fetchCount + 1);
      setTaskData(res);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { loading, error, taskData, fetchTasks, fetchCount };
};

export default useFetchTasks;
