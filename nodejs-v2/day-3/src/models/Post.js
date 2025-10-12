import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // also you can here make a referencing between the two models (bonus if you did it)
});

export default new mongoose.model("Post", postSchema);
