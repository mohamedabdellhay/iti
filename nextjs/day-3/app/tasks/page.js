"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Check,
  Trash2,
  Loader2,
  Calendar,
  Edit2,
  XCircle,
} from "lucide-react";

// Utility function to format dates for display
const formatDate = (dateString) => {
  if (!dateString) return "No Deadline";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // --- API Interaction Functions (Fetch, Create, Update, Delete) ---

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || "Failed to fetch tasks.");
      }
      // Sort tasks: Incomplete tasks first, then by deadline.
      data.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(a.deadline) - new Date(b.deadline);
      });
      setTasks(data);
    } catch (err) {
      setError(`Error fetching tasks: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Run once on component mount

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskName.trim() || !newTaskDeadline) {
      setError("Name and Deadline are required to create a task.");
      return;
    }

    setIsAdding(true);
    setError(null);

    const taskData = {
      name: newTaskName.trim(),
      deadline: new Date(newTaskDeadline).toISOString(),
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const newTask = await response.json();

      if (!response.ok) {
        throw new Error(newTask.error || "Failed to add task.");
      }

      // Add the new task to state and reset form
      setTasks((prev) =>
        [...prev, newTask].sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return new Date(a.deadline) - new Date(b.deadline);
        })
      );
      setNewTaskName("");
      setNewTaskDeadline("");
    } catch (err) {
      setError(`Error adding task: ${err.message}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleCompleted = async (id, currentCompleted) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      const updatedTask = await response.json();

      if (!response.ok) {
        throw new Error(updatedTask.error || "Failed to update task.");
      }

      // Update state and re-sort
      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((task) =>
          task._id === id ? { ...task, completed: updatedTask.completed } : task
        );
        return newTasks.sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
      });
    } catch (err) {
      setError(`Error updating task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task.");
      }

      // Remove task from state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(`Error deleting task: ${err.message}`);
    }
  };

  // --- Helper Components & Rendering ---

  const TaskItem = ({ task }) => {
    const isOverdue = !task.completed && new Date(task.deadline) < new Date();

    // Base styles
    let baseStyles =
      "p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 border-l-4";
    let statusStyles = "bg-white border-blue-500";

    if (task.completed) {
      statusStyles = "bg-green-50 border-green-500 opacity-70";
    } else if (isOverdue) {
      statusStyles = "bg-red-50 border-red-500 animate-pulse";
    } else {
      statusStyles = "bg-white border-blue-500 hover:shadow-lg";
    }

    return (
      <div className={`${baseStyles} ${statusStyles} mb-3`}>
        {/* Task Info */}
        <div className="flex-1 min-w-0 pr-4">
          <p
            className={`text-lg font-semibold truncate ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.name}
          </p>
          <div className="flex items-center text-sm mt-1">
            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
            <p
              className={`text-gray-600 ${
                isOverdue && !task.completed ? "font-bold text-red-600" : ""
              }`}
            >
              {formatDate(task.deadline)}
              {isOverdue && !task.completed && (
                <span className="ml-2 text-xs">(OVERDUE)</span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          {/* Toggle Button */}
          <button
            onClick={() => handleToggleCompleted(task._id, task.completed)}
            className={`p-2 rounded-full shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              task.completed
                ? "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
                : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 focus:ring-blue-500"
            }`}
            title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          >
            <Check className="w-5 h-5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="p-2 rounded-full bg-white text-red-500 border border-gray-300 shadow-sm hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Delete Task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const tasksRemaining = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight flex items-center justify-center">
            <Edit2 className="w-8 h-8 mr-3 text-blue-600" />
            Full-Stack ToDo Manager
          </h1>
          <p className="text-lg text-gray-600">
            {tasksRemaining === 0
              ? "All tasks complete! Time for a break."
              : `You have ${tasksRemaining} task${
                  tasksRemaining !== 1 ? "s" : ""
                } remaining.`}
          </p>
        </header>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between shadow-md">
            <span className="flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              {error}
            </span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 font-bold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* --- 1. Add New Task Form --- */}
        <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task Name (e.g., Finish CRUD API)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-black"
              disabled={isAdding}
            />
            <input
              type="datetime-local"
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-black"
              disabled={isAdding}
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center disabled:bg-blue-400"
              disabled={isAdding || !newTaskName.trim() || !newTaskDeadline}
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Adding Task...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Task
                </>
              )}
            </button>
          </form>
        </div>

        {/* --- 2. Task List --- */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Tasks</h2>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-3" />
              <p className="text-gray-600 text-lg">Loading tasks...</p>
            </div>
          )}

          {!isLoading && tasks.length === 0 && (
            <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
              <p className="text-lg">
                No tasks found. Start by adding one above!
              </p>
            </div>
          )}

          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
