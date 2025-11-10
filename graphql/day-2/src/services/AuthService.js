import UserModel from "../models/User.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  async signup(userData) {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    if (userData.password.length < 6) {
      throw new Error("Password must be greater than or equal  6 char");
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    const user = new UserModel(userData);
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      id: user._id,
      email: user.email,
      token,
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      id: user._id,
      email: user.email,
      token,
    };
  }
}

export default new AuthService();
