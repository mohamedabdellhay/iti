import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 0.1 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
