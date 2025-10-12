import AppError from "../util/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((el) => el.message);
      return next(
        new AppError(`Validation error: ${messages.join(", ")}`, 400)
      );
    }

    next();
  };
};

export default validate;
