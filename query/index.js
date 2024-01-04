const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { promisify } = require("util");
const {
  handlePostCreated,
  handleCommentCreated,
  handleCommentUpdated,
} = require("./utils/factory");
const axios = require("axios");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const fileLocation = `${__dirname}/data/posts.json`;

const handleEvent = async (data, type) => {
  const posts = JSON.parse(await readFile(fileLocation));

  if (type === "PostCreated") {
    handlePostCreated(data, posts);
  } else if (type === "CommentCreated") {
    handleCommentCreated(data, posts);
  } else if (type === "CommentUpdated") {
    handleCommentUpdated(data, posts);
  }

  await writeFile(fileLocation, JSON.stringify(posts, null, 2));
};

const app = express();

app.use(express.json());

app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const posts = JSON.parse(await readFile(fileLocation));

    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error reading posts file" });
  }
});

// Listen to
app.post("/events", async (req, res) => {
  console.log("Received Event 🚀", req.body.type);

  try {
    const { type, data } = req.body;

    await handleEvent(data, type);

    res.send({});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error Processing Query" });
  }
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  try {
    const response = await axios.get("http://localhost:4005/events");

    for (let event of response.data) {
      console.log("💻 Processing event: ", event.type);

      await handleEvent(event.data, event.type);
    }
  } catch (error) {
    console.log(error);
  }
});
