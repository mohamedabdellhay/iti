import express from "express";
import connectDB from "./config/db.js";
import AppRoutes from "./routes/index.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import rateLimiter from "./middlewares/rateLimiter.js";
const app = express();

// connect to mongo
connectDB();

// rate limit middleware
app.use(rateLimiter);

app.use(express.json());
app.use("/", AppRoutes);

// error handler
app.use(globalErrorHandler);

export default app;
