import UserModel from "../models/User.js";

class UserService {
  async getAll() {
    const users = await UserModel.find();
    return users;
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async create(data) {
    const user = await UserModel.create(data);
    return user;
  }

  async update(id, data) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

export default new UserService();
