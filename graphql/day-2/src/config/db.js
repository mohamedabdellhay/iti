import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/graphql");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
