import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Optional: Adds createdAt and updatedAt timestamps automatically
    timestamps: true,
  }
);

// Check if the model already exists in mongoose.models
const ToDoModel = mongoose.models.Task || mongoose.model("Task", toDoSchema);

export default ToDoModel;
