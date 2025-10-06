// ### Assignment 1.1: Understanding Different File Reading Methods
// 1. **Synchronous File Reading**
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
try {
  const fileData = fs.readFileSync("./data.json", "utf-8");
  console.log("file data", fileData);

  const parsedData = JSON.parse(fileData);
  console.log("parsed data", parsedData);
} catch (error) {
  console.log(`Error: ${error}`);
}

// 2. **Asynchronous File Reading (Callback Style)**
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err.message);
    return;
  }
  try {
    const jsonData = JSON.parse(data);
    console.log("Parsed JSON data:", jsonData);
  } catch (parseError) {
    console.error("Error: Invalid JSON format.", parseError.message);
  }
});

// 3. **Promise-based File Reading**
fsPromise
  .readFile("data.json", "utf8")
  .then((data) => {
    const jsonData = JSON.parse(data);
    console.log("Parsed JSON data:", jsonData);
  })
  .catch((error) => {
    console.error("An  error occurred:", error.message);
  });

//   4. **Async/Await File Reading**

async function readJsonFile() {
  try {
    const data = await fsPromise.readFile("data.json", "utf8");

    const jsonData = JSON.parse(data);

    console.log("Parsed JSON data:", jsonData);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error: File not found.");
    } else if (error.name === "SyntaxError") {
      console.error("Error: Invalid JSON format.");
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

// Call the async function
readJsonFile();

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ### Assignment 1.2: File Writing Operations

// 1. **Adding Data to JSON File**
function addUserSync(newUser) {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    const users = JSON.parse(data);

    const exists = users.some(
      (u) => u.id === newUser.id || u.email === newUser.email
    );
    if (exists) {
      console.log("⚠️ User already exists, skipping:", newUser.username);
      return;
    }

    users.push(newUser);
    fs.writeFileSync("data.json", JSON.stringify(users, null, 2), "utf8");

    console.log("✅ User added successfully (synchronous):", newUser);
  } catch (error) {
    console.error("❌ Error updating users file:", error.message);
  }
}

// 2. **Creating a Backup System**
async function backupDataFile() {
  const timestamp = new Date().toISOString().split("T")[0]; // e.g., 2025-10-06
  const backupFile = path.join(__dirname, `users-backup-${timestamp}.json`);

  try {
    const data = await fsPromise.readFile("data.json", "utf8");

    await fsPromise.writeFile(backupFile, data, "utf8");

    console.log(`✅ Backup created successfully: ${backupFile}`);
  } catch (error) {
    console.error("❌ Error creating backup:", error.message);
  }
}

// add user once manually
addUserSync({
  id: 6,
  username: "frank",
  email: "frank@example.com",
  role: "user",
});

// keep backup running every 10 seconds
setInterval(() => backupDataFile(), 10000);
