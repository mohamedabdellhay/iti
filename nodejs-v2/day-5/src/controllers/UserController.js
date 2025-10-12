import AuthService from "../services/AuthService.js";

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async register(req, res) {
    const userData = req.body;
    try {
      const user = await AuthService.register(userData);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    const userId = req.user.id; // Assuming user ID is set in req.user by authentication middleware
    try {
      const user = await AuthService.getUserById(userId);
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updatePassword(req, res) {
    const userId = req.user.id; // Assuming user ID is set in req.user by authentication middleware
    const { oldPassword, newPassword } = req.body;
    try {
      await AuthService.updatePassword(userId, oldPassword, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
