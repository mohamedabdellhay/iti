// ## Part 2: Building a CRUD Server
const express = require("express");
const fs = require("fs");
const dataPath = "data.json";

let users = [];

// helper functions
function readUsers() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("File not found. Make sure data.json exists.");
    } else if (error.name === "SyntaxError") {
      console.error("Invalid JSON format inside data.json.");
    } else {
      console.error("Error updating users file:", error.message);
    }
  }
}

function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), "utf8");
}

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// ############################
const app = express();
app.use(express.json());

app.get(
  "/",
  asyncHandler((req, res) => {
    res.json({
      message: "app running successfully",
    });
  })
);

// 1. GET /users - Retrieve All Users
app.get(
  "/users/",
  asyncHandler((req, res) => {
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  })
);

// 2. GET /users/:id - Retrieve User by ID
app.get(
  "/users/:id",
  asyncHandler((req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  })
);

// 3. POST /users - Create a New User
app.post(
  "/users/",
  asyncHandler((req, res) => {
    const newUser = req.body;

    // Generate new ID (next available number)
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    newUser.id = newId;

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  })
);

// 4. PUT /users/:id - Update an Existing User
app.put(
  "/users/:id",
  asyncHandler((req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update user fields
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeUsers(users);

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: users[userIndex],
    });
  })
);

// 5. DELETE /users/:id - Delete a User
app.delete(
  "/users/:id",
  asyncHandler((req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    writeUsers(users);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  })
);

// ### Bonus 1: User Search
app.get("/search", (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(200).json(users);
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  res.status(200).json({
    success: true,
    count: filteredUsers.length,
    users: filteredUsers,
  });
});

// ### Bonus 2: User Count
app.get(
  "/count",
  asyncHandler((req, res) => {
    const admin = users.filter((user) => user.role == "admin").length;
    const user = users.filter((user) => user.role == "user").length;

    res.json({
      admin,
      user,
    });
  })
);

app.use((err, req, res, next) => {
  console.error("error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "internal Server Error",
  });
});
// listen app on port 3000
app.listen(3000, () => {
  (async () => {
    users = await readUsers();
  })();
  console.log("server is running visit http://localhost:3000");
});
