import { useEffect, useState } from "react";
import { TaskDto } from "../types/dto";
import { api } from "../utils/axios";

const useFetchSingleTask = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [task, setTask] = useState<TaskDto>();

  useEffect(() => {
    const fetchTasks = async (id: string) => {
      try {
        setLoading(true);
        const res = (await api.get(`/api/tasks/${id}`)).data as TaskDto;
        console.log(res);
        setTask(res);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks(id);
  }, [id]);

  return { loading, error, task };
};

export default useFetchSingleTask;
