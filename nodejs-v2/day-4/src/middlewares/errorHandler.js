const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return { message, statusCode: 400 };
};

const handleDuplicateKeyErrorDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate value "${value}" for field "${field}". Please use another value.`;
  return { message, statusCode: 400 };
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return { message, statusCode: 400 };
};

const globalErrorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong!",
  };

  if (err.name === "CastError") {
    customError = handleCastErrorDB(err);
  } else if (err.code === 11000) {
    customError = handleDuplicateKeyErrorDB(err);
  } else if (err.name === "ValidationError") {
    customError = handleValidationErrorDB(err);
  }

  res.status(customError.statusCode).json({
    status: "error",
    message: customError.message,
  });
};

export default globalErrorHandler;
