import TodoModel from "../model/todoSchema.js";

class TodoController {
  static async getAll() {
    try {
      const todos = await TodoModel.find();
      return todos;
    } catch (error) {
      return {
        status: 500,
        message: "internal Server error",
      };
    }
  }
  static async getToDo(id) {
    try {
      const todo = await TodoModel.findById(id);
      return todo;
    } catch (error) {
      return {
        status: 500,
        message: "internal Server error",
      };
    }
  }

  static async createToDo(challenge, startDate, userId) {
    try {
      const newTodo = await TodoModel.create({
        challenge,
        startDate,
        userId,
      });

      return newTodo;
    } catch (error) {
      return {
        status: 500,
        message: "internal Server error",
      };
    }
  }
  static async getUserTodos(userId) {
    try {
      const userTodos = await TodoModel.find({ userId });
      return userTodos;
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
  static async updateTopic(req) {
    try {
      const { _id } = req.params;
      const updated = await TodoModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return updated;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  static async deleteTopic(id) {
    try {
      const deleted = await TodoModel.findByIdAndDelete(id);

      return deleted;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

export default TodoController;
