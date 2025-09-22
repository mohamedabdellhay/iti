import express from "express";
import Utilities from "../utilities/response.js";
import UserController from "../controller/userController.js";
import TodoController from "../controller/todoController.js";
const userRouter = express.Router();

userRouter.get(
  "/",
  async (req, res, next) =>
    await Utilities.response(req, res, next, UserController.getAll)
);

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await UserController.getUser(userId);
  res.json(user);
});

userRouter.post("/", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  console.log(req.body);
  const data = await UserController.createUser(userName, email, password);
  res.json(data);
});

userRouter.get("/todos/:id", async (req, res) => {
  const userId = req.params.id;
  const userTodos = await TodoController.getUserTodos(userId);
  res.json(userTodos);
});

export default userRouter;
