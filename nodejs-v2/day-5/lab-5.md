# Lab: Secure Authentication & Authorization in Node.js

## Overview

In this lab, you will implement secure user authentication and authorization in a Node.js application. You will learn how to:

- Understand the differences between **hashing** and **encryption**.
- Create signup and login routes and controllers.
- Generate and verify JSON Web Tokens (JWT) for authentication.
- Protect routes with authentication and role-based authorization.
- Enhance API security with rate limiting and additional middlewares.

---

## Objectives

1. **Understand Hashing vs. Encryption**

   - **Hashing:** A one-way process used for securely storing passwords. Once hashed, data cannot be reverted to its original form.
   - **Encryption:** A reversible process that encodes data so that it can be later decoded with a secret key.

2. **Implement Signup and Login Endpoints**

   - Remove the old "create user" route.
   - Add new `/users/signup` and `/users/login` endpoints.
   - Validate input, hash passwords, and generate tokens.

3. **Implement JWT-Based Authentication**

   - Create an authentication middleware to protect routes.
   - Use the token payload to manage access to data (such as showing only the authenticated user's posts).

4. **Implement Role-Based Authorization**

   - Create a `restrictTo` middleware to allow access based on user roles.

5. **Enhance API Security**
   - Apply rate limiting, Helmet, express-mongo-sanitize, xss-clean, and hpp.

---

## Instructions

### 1. Update User Routes

In your `routes/users.js` file, remove the old create user route and add the following routes:

```jsx:routes/users.js
// Add these endpionts
// POST /users/signup -> create a new user
// POST /users/login -> login a user
```

---

### 2. Implement the Signup Controller

Create or update your `controllers/users.js` with a `signup` function that:

- Make sure to recive and Checks that both `password` and `passwordConfirm` are provided.
- Validates that both fields match.
- Hashes the password using bcrypt.
- Creates a new user with the hashed password.

---

### 3. Implement the Login Controller with JWT

Also in your `controllers/users.js`, add a `login` function that:

- Validates that `email` and `password` are provided.
- Checks whether the user exists and if the password is correct.
- Promisfy the `jwt.sign` function to prevent using synchrounus code.
- Generates a JWT token using the promisified `jwt.sign` function and store data about the user in it.

---

### 4. Create Authentication Middleware

Create a new file `middlewares/auth.js` that verifies the token before allowing access to protected routes:

Also, don't forget update your error handler in `middlewares/errorhandler.js` to capture JWT errors.

---

### 5. Implement Role-Based Authorization

Create a new file `middlewares/restrictTo.js` to limit access based on user roles:

- apply `auth` and `restrictTo` middlewares to the `GET /users` to restrict it to admin users only

---

### 6. Secure Posts Routes

Update your posts routes (e.g., `routes/posts.js`) to use the auth middleware, and controller (e.g., `controllers/posts.js`) so that :

- `GET /posts` returns all users post but to add a flag for the posts created by the authenticated user to mark them, you are free to name the flag anything you want but make it meaningful.
- `GET /posts/:id` also to return a flag if this post was created by the authenticated user.
- `POST /posts` creates a post and assign authenticated user id to that post.
- `PUT or PATCH /posts/:id` to allow to edit only the posts created by the authenticated user.
- `DELETE /posts/:id` to allow to delete only the posts created by the authenticated user.

do not forget to protect the routes in `routes/posts.js` using the auth `middlewares/auth.js` middleware so you can access the authenticated user data in the next middleware or handler

---

### 7. Make CustomError class and global error middleware

refactor your code to throw client errors using the custom Custom Error Class

### 8. Apply Request level validation using joi

- make JoiValidator middleware that accepts a schema and validates it
- refactor any endpointr you were validating the incoming request body and create a schema for each request

### 9. Add Security Enhancements

Enhance your API security by integrating additional middlewares.
use the following packages and read more about every package and what it protects us from

#### A. express-rate-limit

#### B. helmet

#### C. express-v5-mongo-sanitize (find alternitive that works with express 5)

#### D. express-xss-sanitizer

#### E. hpp

---

---

Good luck and happy coding❤️
