import express from "express";
import PostController from "../controllers/PostController.js";
import validate from "../middlewares/validate.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validations/postValidation.js";

const router = express.Router();

router.get("/", PostController.getAll);

router.get("/:id", PostController.getById);

router.post("/", validate(createPostSchema), PostController.create);

router.put("/:id", validate(updatePostSchema), PostController.update);

router.delete("/:id", PostController.delete);

export default router;
