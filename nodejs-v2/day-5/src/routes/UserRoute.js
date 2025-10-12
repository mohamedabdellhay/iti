import UserController from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.put("/updatePassword", UserController.updatePassword);

export default router;
