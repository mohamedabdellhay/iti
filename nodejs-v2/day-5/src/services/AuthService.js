import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import "dotenv/config.js";
class AuthService {
  async register(userData) {
    const { name, email, password } = userData;
    console.log("userData:", userData);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    console.log("Found user:", user);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    // check password
    const isValid = await bcrypt.compare(password, user.password);
    console.log("isValid:", isValid);

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token; // Return only necessary user info along with token
  }

  async updatePassword(userId, oldPassword, newPassword) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new Error("Old password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: "Password updated successfully" };
  }
}

export default new AuthService();
