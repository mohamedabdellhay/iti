import express from "express";
import morgan from "morgan";
import fs from "fs/promises";
import { fetchJsonData } from "./helper.js";

const app = express();
const PORT = 3000;
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: `app is running on port ${PORT}`,
  });
});


app.use(morgan("dev"));

app.use(async (req, res, next) => {
  await fs.appendFile(
    "logs.txt",
    `url:${req.url} - method:${req.method} - body:${JSON.stringify(req.body)}\n`
  );
  next();
});

// get all topics
app.get("/todo", async (req, res) => {
  const data = await fetchJsonData("data.json");
  res.json(data);
});

// get topic bt id
app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await fetchJsonData("data.json", id);
  if (data.length === 0) {
    return res.json({
      status: 404,
      message: "topic not Found",
    });
  }
  res.json(data);
});

// create topic
app.post(
  "/todo",
  (req, res, next) => {
    if (!req.body.createdBy) {
      return res.status(400).json({ error: "createdBy is a required field" });
    }
    next();
  },
  async (req, res) => {
    try {
      const data = await fs.readFile("data.json", "utf-8");
      const ids = JSON.parse(data);

      const lastId = ids.reduce((a, c) => (a.id > c.id ? a : c)).id ?? 1;

      const topic = req.body;
      const newTopic = { ...topic, id: lastId + 1 };
      ids.push(newTopic);

      await fs.writeFile("data.json", JSON.stringify(ids, null, 2));

      res.json({ message: "topic created", topic: newTopic });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// update topic
app.patch(
  "/todo/:id",
  (req, res, next) => {
    if (!req.body.updatedBy) {
      return res.status(400).json({ error: "updatedBy is a required field" });
    }
    next();
  },
  async (req, res) => {
    const id = req.params.id;
    try {
      const data = await fetchJsonData("data.json", id);
      const allTopics = await fetchJsonData("data.json");

      const updatedTopic = { ...data[0], ...req.body };
      const topicId = allTopics.findIndex((ele) => ele.id == id);

      if (topicId == -1) {
        return res.status(404).json({ message: "topic not found" });
      }
      allTopics[topicId] = updatedTopic;

      console.log(allTopics);

      await fs.writeFile("data.json", JSON.stringify(allTopics, null, 2));

      res.json({ message: "topic updated", updatedTopic });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// /delete topic

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const topics = await fetchJsonData("data.json");
  const deletedTopic = topics.filter((topic) => topic.id == id);

  if (deletedTopic.length == 0) {
    return res.status(404).json({ message: "topic not found" });
  }
  const filteredTopic = topics.filter((topic) => topic.id != id);

  console.log(filteredTopic);
  await fs.writeFile("data.json", JSON.stringify(filteredTopic, null, 2));

  res.json({
    message: "topic deleted successful",
    deletedTopic,
  });
});

app.listen(PORT, () => {
  console.log(`app is running om port ${PORT}`);
});
