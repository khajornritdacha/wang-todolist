import { useEffect, useState } from "react";
import { TaskDto } from "../types/dto";
import { api } from "../utils/axios";

const useFetchSingleTask = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [task, setTask] = useState<TaskDto>();

  useEffect(() => {
    const fetchTask = async (id: string) => {
      try {
        setLoading(true);
        const res = (await api.get(`/api/tasks/${id}`)).data as TaskDto;
        setTask(res);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTask(id);
  }, [id]);

  return { loading, error, task };
};

export default useFetchSingleTask;
