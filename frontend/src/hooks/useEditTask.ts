import { useState } from "react";
import { TaskDto } from "../types/dto";
import { api } from "../utils/axios";

const useEditTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editTask = async (task: TaskDto) => {
    try {
      setLoading(true);
      const res = (await api.put(`/api/tasks`, { task })).data as TaskDto;
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, editTask };
};

export default useEditTask;
