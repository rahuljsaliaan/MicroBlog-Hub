const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const axios = require("axios");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();

app.use(express.json());
app.use(cors());

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = JSON.parse(await readFile(`${__dirname}/data/posts.json`));

    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error reading posts file" });
  }
});

// Create a post
app.post("/posts", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    const posts = JSON.parse(await readFile(`${__dirname}/data/posts.json`));

    posts[id] = {
      id,
      title,
    };

    await writeFile(`${__dirname}/data/posts.json`, JSON.stringify(posts));

    // Emit Event
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    res.status(500).send({ message: "Error processing posts file" });
  }
});

// Listen to events
app.post("/events", (req, res) => {
  console.log("Received Event 🚀", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
