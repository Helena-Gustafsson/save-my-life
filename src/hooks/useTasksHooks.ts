import { useEffect, useState } from "react";
import type { Task } from "../types/taskTypes";

// ==========================================
// HOOK 1: Fetch all tasks (useTasks)
// ==========================================

export const useTasks = (
  category: string,
  status: string,
  priority: string,
) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError("");

      try {
        const url = "https://shelf-api-mu.vercel.app/api/helena/items";

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          const filteredTasks = data.filter((task: Task) => {
            const matchesCategoryFilter =
              !category ||
              category === "All categories" ||
              task.category === category;
            const matchesStatusFilter =
              !status || status === "All statuses" || task.status === status;

            let selectedPriorityNumber = 0;
            if (priority === "Low") selectedPriorityNumber = 1;
            if (priority === "Medium") selectedPriorityNumber = 2;
            if (priority === "High") selectedPriorityNumber = 3;

            const matchesPriorityFilter =
              !priority ||
              priority === "All priorities" ||
              task.rating === selectedPriorityNumber;

            return (
              matchesCategoryFilter &&
              matchesStatusFilter &&
              matchesPriorityFilter
            );
          });

          setTasks(filteredTasks);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [category, status, priority]);

  return { tasks, setTasks, isLoading, error };
};

// ==========================================
// HOOK 2: Fetch one task (useTask)
// ==========================================

export const useTask = (id: string | undefined) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSingleTask = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://shelf-api-mu.vercel.app/api/helena/items/${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not fetch the task");
          return;
        }

        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleTask();
  }, [id]);

  return { task, isLoading, error };
};
