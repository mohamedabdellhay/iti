import connectDB from "@/app/config/db";
import ToDoModel from "@/app/models/todoModel";

export async function getAll() {
  try {
    await connectDB();
    const todos = await ToDoModel.find().lean();
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to fetch all ToDo items:", error);
    throw new Error("Failed to load ToDo items due to a server error.");
  }
}

export async function getTaskById(id) {
  try {
    await connectDB();
    const todo = await ToDoModel.findById(id).lean();

    if (!todo) {
      return null; // Task not found
    }

    return JSON.parse(JSON.stringify(todo));
  } catch (error) {
    console.error(`Failed to fetch ToDo item by ID ${id}:`, error);
    if (error.name === "CastError") {
      throw new Error("Invalid task ID format.");
    }
    throw new Error("Failed to load ToDo item due to a server error.");
  }
}

export async function createTask(data) {
  try {
    await connectDB();

    const newTask = await ToDoModel.create(data);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    console.error("Failed to create ToDo item:", error);

    if (error.name === "ValidationError") {
      throw new Error(
        `Task validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    throw new Error("Failed to create ToDo item due to a server error.");
  }
}

export async function updateTask(id, data) {
  try {
    await connectDB();

    const updatedTask = await ToDoModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedTask) {
      throw new Error("Task not found.");
    }

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    console.error(`Failed to update ToDo item with ID ${id}:`, error);

    if (error.name === "ValidationError") {
      throw new Error(
        `Task validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    if (error.name === "CastError") {
      throw new Error("Invalid task ID format.");
    }

    throw new Error(
      `Failed to update ToDo item due to a server error or invalid ID.`
    );
  }
}

export async function deleteTask(id) {
  try {
    await connectDB();

    const result = await ToDoModel.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Task not found.");
    }
  } catch (error) {
    console.error(`Failed to delete ToDo item with ID ${id}:`, error);

    if (error.name === "CastError") {
      throw new Error("Invalid task ID format.");
    }

    throw new Error(
      `Failed to delete ToDo item due to a server error or invalid ID.`
    );
  }
}
