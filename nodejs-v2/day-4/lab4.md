# Lab Day 4: Enhancing the Node.js Server

## Objectives

1.  **Environment Variable Setup**:

    - Install and configure `dotenv` to manage environment variables.
    - Securely store your database URI and server port using environment variables.

2.  **Global Error Handling**:

    - Implement a global error middleware to centralize error handling.
    - Specifically, catch and handle Mongoose errors such as `ValidationError`, `CastError`, and `DuplicateKeyError` with appropriate responses.

3.  **Custom Error Class**:

    - Create a custom error class for handling client-specific errors.
    - Utilize this custom error class to throw meaningful errors in your application logic.

4.  **Rate Limiting Middleware**:

    - Develop a rate limiting middleware to protect your API from abuse.
    - Ensure the middleware provides a proper response structure when a client exceeds the rate limit.

5.  **Validation Middleware**:
    - Integrate a validation package (e.g., Joi, Express-validator) into your project.
    - Create a generic validation middleware.
    - Define validation schemas for your `create` and `update` user endpoints.
