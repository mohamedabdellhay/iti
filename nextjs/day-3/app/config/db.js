import mongoose from "mongoose";
const dbURI = "mongodb://localhost:27017/nextjs";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log(`Database Connected Failed:(error)=>${error}`);
    process.exit(1);
  }
};

export default connectDB;
