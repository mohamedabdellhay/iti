import UserModel from "../model/userSchema.js";

class UserController {
  static async getAll() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (err) {
      return {
        status: 500,
        message: "server Error",
      };
    }
  }

  static async getUser(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  static async createUser(req) {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body);
    try {
      const newUser = await UserModel.create({
        userName: userName,
        email: email,
        password: password,
      });

      console.log(newUser);

      return newUser;
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}

export default UserController;
