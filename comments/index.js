const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const axios = require("axios");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const commentsByPostId = JSON.parse(
      await readFile(`${__dirname}/data/commentsByPostId.json`)
    );

    // NOTE: If there are no comments for a post, return an empty array (this is done because the comments may not have the comment of the post yet, which might return undefined)
    const comments = commentsByPostId[req.params.id] || [];

    res.send(comments);
  } catch (error) {
    res.status(500).send({ error: "Error reading comments file" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;

    const commentsByPostId = JSON.parse(
      await readFile(`${__dirname}/data/commentsByPostId.json`)
    );

    const comments = commentsByPostId[postId] || [];

    comments.push({ id, content });

    // example: {
    //   "postId": [
    //     "commentId": {
    //       "content": "this is a comment"
    //     }
    //   ]
    // }
    commentsByPostId[postId] = comments;

    // Emit event
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id,
        content,
        postId,
      },
    });

    await writeFile(
      `${__dirname}/data/commentsByPostId.json`,
      JSON.stringify(commentsByPostId)
    );

    res.status(201).send(comments);
  } catch (error) {
    res.status(500).send({ message: "Error processing comments file" });
  }
});

// Listen to events
app.post("/events", (req, res) => {
  console.log("Received Event 🚀", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
