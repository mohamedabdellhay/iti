import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  challenge: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "active", "done"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
