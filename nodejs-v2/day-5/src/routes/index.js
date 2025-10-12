import express from "express";
import UserRoute from "./UserRoute.js";
import authenticateToken from "../middlewares/authenticateToken.js";
const router = express.Router();

router.use(authenticateToken);
router.use("/user", UserRoute);
export default router;
