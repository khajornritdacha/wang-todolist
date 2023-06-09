import { useState } from "react";
import { api } from "../utils/axios";

const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createTask = async (
    title: string,
    dueDate: string,
    dueTime: string
  ) => {
    try {
      setLoading(true);
      const res = await api.post(`/api/tasks`, {
        title,
        dueDate,
        dueTime,
      });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createTask };
};

export default useCreateTask;
