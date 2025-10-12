import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),

  content: Joi.string().min(10).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 10 characters",
  }),

  userId: Joi.string()
    .custom(isValidObjectId, "ObjectId Validation")
    .required()
    .messages({
      "any.invalid": "Invalid userId format",
      "string.empty": "userId is required",
    }),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10),
  userId: Joi.string().custom(isValidObjectId, "ObjectId Validation"),
});
