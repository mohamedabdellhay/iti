import UserService from "../Services/UserService.js";
import asyncHandler from "../util/asyncHandler.js";

class UserController {
  getAll = asyncHandler(async (req, res) => {
    const users = await UserService.getAll();

    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    res.status(200).json(users);
  });

  getById = asyncHandler(async (req, res) => {
    const user = await UserService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  });

  create = asyncHandler(async (req, res) => {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  });

  update = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  });

  delete = asyncHandler(async (req, res) => {
    const deletedUser = await UserService.delete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
}

export default new UserController();
