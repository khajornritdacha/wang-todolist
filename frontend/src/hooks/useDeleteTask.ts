import { useState } from "react";
import { TaskDto } from "../@types/dto";
import { api } from "../utils/axios";

const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      const res = (await api.delete(`/api/tasks/${id}`)).data as TaskDto;
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteTask };
};

export default useDeleteTask;
