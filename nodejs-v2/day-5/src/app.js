import express from "express";
import AppRoute from "./routes/index.js";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
const app = express();

// Connect to MongoDB
connectDB();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the AppRoute for handling user-related routes
app.use(AppRoute);

app.get("/", (req, res) => {
  res.json({ message: "hi form day-5 at nodejs-v2 course" });
});

export default app;
