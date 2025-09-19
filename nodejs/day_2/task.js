const http = require("http");

const host = "localhost";
const port = 3000;

let todos = [
  {
    id: 1,
    challenge: "learn Http",
    startDate: "2025-02-03",
    status: "pending",
  },
];

let lastId = 2;

const server = http.createServer((req, res) => {
  // set header application/json to fit with api
  res.setHeader("Content-Type", "application/json");

  // get all todos
  if (req.url === "/todos" && req.method == "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }

  //    create new todo
  else if (req.url === "/todos" && req.method === "POST") {
    let body = "";

    // Listen for data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body); // assuming JSON
        parsedData.id = lastId;
        lastId++;
        todos.push(parsedData);
        console.log("Received:", parsedData);

        res.writeHead(200);
        res.end(JSON.stringify({ message: "todo created", data: parsedData }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  //   get todo by id
  else if (req.url.startsWith("/todos/") && req.method == "GET") {
    const id = parseInt(req.url.split("/")[2]);
    console.log(id);
    const todo = todos.find((u) => u.id === id);
    if (todo) {
      res.writeHead(200);
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "tobic not found" }));
    }
  }

  //   update single todo
  else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    const id = parseInt(req.url.split("/")[2]);
    console.log(id);
    const todoIndex = todos.findIndex((u) => u.id === id);

    if (!todoIndex) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "topic not found" }));
    }
    let body = "";

    // Listen for data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    // When all data is received
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body); // assuming JSON

        console.log("Received:", parsedData);
        todos[todoIndex] = { ...todos[todoIndex], ...parsedData };
        res.writeHead(200);
        res.end(JSON.stringify({ message: "todo created", data: parsedData }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  //   delete single todo
  else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    console.log(id);

    try {
      const deletedTodo = todos.filter((t) => t.id === id);
      res.writeHead(200);
      res.end(JSON.stringify({ message: "topic deleted", data: deletedTodo }));
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "topic not found" }));
    }
  }

  //   return 404 if route not found
  else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

/*

| Criteria          | http module                            | Express                           |
| ----------------- | -------------------------------------- | --------------------------------- |
| Create server     | `http.createServer`                    | `express()`                       |
| Handle requests   | `server.on("request")` or callback     | `app.get/post/...`                |
| Ease of use       | More complex (manual headers, routing) | Very easy (routing built-in)      |
| Low-level control | High (you manage everything)           | Lower (abstracted, but faster)    |
| Best suited for   | Learning basics, very small projects   | Real-world apps, APIs, production |


*/
