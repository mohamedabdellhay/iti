import mongoose from "mongoose";
import "dotenv/config.js";

const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error("Database url is not found in .env");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || DB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
