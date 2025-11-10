import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  major: {
    type: String,
    required: false,
  },
  courses: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Student", studentSchema);
