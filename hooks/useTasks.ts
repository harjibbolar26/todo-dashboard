import useSWR, { mutate } from "swr";
import { Task, CreateTaskData, UpdateTaskData } from "@/types";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  });

export function useTasks() {
  const {
    data: tasks = [],
    error,
    isLoading,
  } = useSWR<Task[]>("/api/tasks", fetcher);

  // Create a new task
  const createTask = async (taskData: CreateTaskData) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error("Failed to create task");

    const newTask = await response.json();

    // Optimistically update the cache
    mutate(
      "/api/tasks",
      (currentTasks: Task[] = []) => [newTask, ...currentTasks],
      false
    );

    // Revalidate
    mutate("/api/tasks");

    return newTask;
  };

  // Update a task
  const updateTask = async (id: string, taskData: UpdateTaskData) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error("Failed to update task");

    const updatedTask = await response.json();

    mutate(
      "/api/tasks",
      (currentTasks: Task[] = []) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task)),
      false
    );

    mutate("/api/tasks");

    return updatedTask;
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete task");

    mutate(
      "/api/tasks",
      (currentTasks: Task[] = []) =>
        currentTasks.filter((task) => task.id !== id),
      false
    );

    mutate("/api/tasks");
  };

  return {
    tasks,
    loading: isLoading,
    error: error?.message || null,
    createTask,
    updateTask,
    deleteTask,
    refetch: () => mutate("/api/tasks"),
  };
}
