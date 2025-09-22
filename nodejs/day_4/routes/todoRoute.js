import express from "express";
import TodoController from "../controller/todoController.js";
const todoRouter = express.Router();

todoRouter.get("/", async (req, res, next) => {
  try {
    const users = await TodoController.getAll();
    res.json({
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

todoRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await TodoController.getToDo(userId);
  res.json(user);
});

todoRouter.post("/", async (req, res) => {
  const challenge = req.body.challenge;
  const startDate = req.body.startDate;
  const userId = req.body.userId;
  console.log(req.body);
  const data = await TodoController.createToDo(challenge, startDate, userId);
  res.json(data);
});
todoRouter.patch("/", async (req, res) => {
  const updated = await TodoController.updateTopic(req);
  if (!updated) {
    return res.status(400).json({ status: 400, message: "Topic not found" });
  }

  return res.json({ status: 200, data: updated });
});
todoRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await TodoController.deleteTopic(id);
  if (!deleted) {
    return res.status(400).json({ status: 400, message: "Topic not found" });
  }
  return res.json({ status: 200, data: deleted });
});

export default todoRouter;
