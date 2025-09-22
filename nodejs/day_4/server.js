import express from "express";
import connectDB from "./db.js/connect.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "server is running",
  });
});

// routes

app.use("/users", userRouter);
app.use("/todo", todoRouter);

app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
});
app.listen(3000, () => {
  console.log(`App is running on ort 3000 http://localhost:3000`);
});
