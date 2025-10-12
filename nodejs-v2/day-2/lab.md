# Lab: File Operations & Building a CRUD Server

## Objective

In this lab, you'll learn how to work with the Node.js file system (fs) module and build a simple Express server with CRUD operations for managing users. This lab is divided into two main parts to help you understand both file handling and web server development.

## Part 1: File Operations with the fs Module

### Overview

The Node.js `fs` (file system) module provides an API for interacting with the file system. You can read, write, create, and delete files using different approaches: synchronous, asynchronous with callbacks, promises, or async/await.

### Assignment 1.1: Understanding Different File Reading Methods

Create a file called `file-operations.js` and implement the following:

1. **Synchronous File Reading**

   - Read a JSON file synchronously using `fs.readFileSync()`
   - Parse the JSON data and log it to the console
   - Handle any potential errors

2. **Asynchronous File Reading (Callback Style)**

   - Read the same file using `fs.readFile()` with a callback
   - Parse and log the data
   - Implement proper error handling

3. **Promise-based File Reading**

   - Use `fs.promises.readFile()` or promisify the callback version
   - Handle the promise with `.then()` and `.catch()`

4. **Async/Await File Reading**
   - Create an async function that uses `await` with `fs.promises.readFile()`
   - Wrap it in a try-catch block for error handling

### Assignment 1.2: File Writing Operations

Extend your `file-operations.js` to include:

1. **Adding Data to JSON File**

   - Read the existing JSON file
   - Add a new user object to the array
   - Write the updated data back to the file
   - Implement this using both synchronous and asynchronous methods

2. **Creating a Backup System**
   - Create a function that backs up your data file
   - Name the backup with a timestamp (e.g., `data-backup-2024-01-15.json`)

### Sample Data Structure

Create a `users.json` file with the following structure:

```json
[
  {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com",
    "role": "admin"
  },
  {
    "id": 2,
    "username": "bob",
    "email": "bob@example.com",
    "role": "user"
  },
  {
    "id": 3,
    "username": "charlie",
    "email": "charlie@example.com",
    "role": "user"
  }
]
```

## Part 2: Building a CRUD Server

### Overview

Now you'll build an Express.js server that performs CRUD (Create, Read, Update, Delete) operations on user data stored in a JSON file.

### Assignment 2.1: Server Setup

Create a file called `server.js` and implement:

1. **Basic Server Setup**

   - Import Express and create an app instance
   - Set up JSON parsing middleware
   - Create a basic route that responds with "Server is running"
   - Start the server on port 3000

2. **Data Loading**
   - Load user data from your JSON file at server startup
   - Store it in a variable that can be accessed by your routes

### Assignment 2.2: Implement CRUD Operations

Add the following endpoints to your server:

#### 1. GET /users - Retrieve All Users

- Return all users in the response
- Include a success message
- Use appropriate HTTP status code (200)

#### 2. GET /users/:id - Retrieve User by ID

- Extract the user ID from the URL parameters
- Find the user with matching ID
- Return the user if found, or a "User not found" message if not found
- Use appropriate HTTP status codes (200 for success, 404 for not found)

#### 3. POST /users - Create a New User

- Accept user data from the request body
- Generate a new ID for the user (use the next available number)
- Add the user to your users array
- Save the updated array to the JSON file
- Return the created user with a success message
- Use appropriate HTTP status code (201)

#### 4. PUT /users/:id - Update an Existing User

- Extract the user ID from URL parameters
- Find the user with matching ID
- Update the user's information with data from request body
- Save changes to the JSON file
- Return the updated user or error message
- Use appropriate HTTP status codes (200 for success, 404 for not found)

#### 5. DELETE /users/:id - Delete a User

- Extract the user ID from URL parameters
- Find and remove the user from the array
- Save the updated array to the JSON file
- Return a success message or error if user not found
- Use appropriate HTTP status codes (200 for success, 404 for not found)

### Assignment 2.3: Error Handling

Add basic error handling to your server:

1. **Try-Catch Blocks**

   - Wrap your route handlers in try-catch blocks
   - Return appropriate error messages and status codes

2. **File Operation Errors**
   - Handle cases where the JSON file might not exist or be corrupted
   - Provide meaningful error messages

## Guidelines

- **Keep It Simple**: Focus on getting the basic functionality working first
- **Test Your Code**: Use a tool like Postman or Thunder Client to test your API endpoints
- **Console Logging**: Add console.log statements to help debug your code
- **File Persistence**: Make sure changes are saved to the JSON file so they persist between server restarts

## Testing Your API

Use the following sample requests to test your endpoints:

### GET All Users

```
GET http://localhost:3000/users
```

### GET User by ID

```
GET http://localhost:3000/users/1
```

### CREATE New User

```
POST http://localhost:3000/users
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "role": "user"
}
```

### UPDATE User

```
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "username": "updated_alice",
  "email": "alice_new@example.com",
  "role": "admin"
}
```

### DELETE User

```
DELETE http://localhost:3000/users/1
```

## Bonus Challenges (Easy)

If you finish early, try these additional features:

### Bonus 1: User Search

- Add a GET endpoint `/users/search?username=alice` that finds users by username
- Make the search case-insensitive

### Bonus 2: User Count

- Add a GET endpoint `/users/count` that returns the total number of users
- Include counts by role (admin vs user)

### Bonus 3: Data Validation

- Add basic validation to ensure required fields (username, email) are provided
- Check that email contains an @ symbol
- Ensure username is at least 3 characters long

### Bonus 4: Logging

- Add console.log statements to track when users are created, updated, or deleted
- Include timestamps in your logs

### Bonus 5: Backup on Changes

- Automatically create a backup of your users.json file whenever data is modified
- Store backups in a `backups` folder with timestamps

## Expected File Structure

After completing this lab, you should have:

```
├── file-operations.js
├── server.js
├── users.json
├── package.json
└── (optional) backups/
    └── users-backup-[timestamp].json
```

## Tips for Success

1. **Start Small**: Get one endpoint working before moving to the next
2. **Test Frequently**: Test each endpoint as you build it
3. **Read Error Messages**: They often tell you exactly what's wrong
4. **Use Console.log**: It's your best friend for debugging

Good luck and happy coding! 🚀
