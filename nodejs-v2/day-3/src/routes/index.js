import express from "express";
import UserRoutes from "./UserRoutes.js";
import PostRoutes from "./PostRoutes.js";
const router = express.Router();

router.use("/users", UserRoutes);
router.use("/posts", PostRoutes);
export default router;
