import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    default: 3,
  },
  instructor: {
    type: String,
  },
});

courseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

courseSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Course", courseSchema);
