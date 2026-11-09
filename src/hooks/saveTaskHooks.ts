import { useState } from "react";
import type { Task, TaskFormData } from "../types/taskTypes";

//Note that rating is priority in the form and changed to a string, but rating in the database is a number.

const useSaveTasks = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addTask = async (
    title: string,
    category: string,
    status: string,
    rating: string,
    date: string,
    notes: string,
  ) => {
    setError(""); // Reset previous errors before initiating a new request
    setMessage(""); // Reset previous messages before initiating a new request

    let ratingNumber = 1; // Low by default

    if (rating === "Medium") {
      ratingNumber = 2;
    }

    if (rating === "High") {
      ratingNumber = 3;
    }

    const taskData: TaskFormData = {
      title,
      category,
      status,
      rating: ratingNumber,
      notes,
    };
    if (date) {
      taskData.date = date;
    }

    try {
      const response = await fetch(
        `https://shelf-api-mu.vercel.app/api/helena/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return null;
      }

      setMessage("Task added successfully!");
      return data; // Return the newly added task data
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      return null;
    }
  };

  const deleteTask = async (deleteId: string) => {
    setError(""); // Reset previous errors before initiating a new request
    setMessage("");
    try {
      const response = await fetch(
        `https://shelf-api-mu.vercel.app/api/helena/items/${deleteId}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return false;
      }

      setMessage("Task deleted successfully!");
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      return false;
    }
  };

  const editTask = async (updatedTask: Task) => {
    setError("");
    setMessage("");

    const dataToSend: TaskFormData = {
      title: updatedTask.title,
      category: updatedTask.category,
      status: updatedTask.status,
      rating: updatedTask.rating,
      notes: updatedTask.notes,
      date: updatedTask.date,
    };

    try {
      const response = await fetch(
        `https://shelf-api-mu.vercel.app/api/helena/items/${updatedTask.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return false;
      }

      setMessage("Task updated successfully!");
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      return false;
    }
  };

  return {
    error,
    message,
    setError,
    setMessage,
    addTask,
    deleteTask,
    editTask,
  };
};

export default useSaveTasks;
