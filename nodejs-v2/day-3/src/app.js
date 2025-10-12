import express from "express";
import connectDB from "./config/db.js";
import AppRoutes from "./routes/index.js";
const app = express();
// connect to mongo
connectDB();

app.use(express.json());
app.use("/", AppRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error("error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "internal Server Error",
  });
});

export default app;
