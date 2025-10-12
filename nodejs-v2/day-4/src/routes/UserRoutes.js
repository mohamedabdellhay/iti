import express from "express";
import UserController from "../controllers/UserController.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.post("/", validate(createUserSchema), UserController.create);

router.put("/:id", validate(createUserSchema), UserController.update);

router.delete("/:id", UserController.delete);

export default router;
