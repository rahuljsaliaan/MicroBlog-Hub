const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const axios = require("axios");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const fileLocation = `${__dirname}/data/commentsByPostId.json`;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const commentsByPostId = JSON.parse(await readFile(fileLocation));

    // NOTE: If there are no comments for a post, return an empty array (this is done because the comments may not have the comment of the post yet, which might return undefined)
    const comments = commentsByPostId[req.params.id] || [];

    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: "Error reading comments file" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;
    const data = { id, content, status: "pending" };

    const commentsByPostId = JSON.parse(await readFile(fileLocation));

    const comments = commentsByPostId[postId] || [];

    comments.push(data);

    // example: {
    //   "postId": [
    //     "commentId": {
    //       "content": "this is a comment"
    //     }
    //   ]
    // }
    commentsByPostId[postId] = comments;

    await writeFile(fileLocation, JSON.stringify(commentsByPostId, null, 2));

    // Emit event
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        ...data,
        postId,
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    res.status(500).send({ message: "Error processing comments file" });
  }
});

// Listen to events
app.post("/events", async (req, res) => {
  console.log("Received Event 🚀", req.body.type);
  try {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
      const { id, postId, status, content } = data;

      const commentsByPostId = JSON.parse(await readFile(fileLocation));

      const comments = commentsByPostId[postId];

      const comment = comments.find((comment) => comment.id === id);

      // NOTE: Modifying the comment.status also modifies the commentsByPostId because it is the same object reference inside the commentsByPostId
      comment.status = status;

      await writeFile(fileLocation, JSON.stringify(commentsByPostId, null, 2));

      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          content,
          status,
          postId,
        },
      });
    }

    res.send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Processing Comments" });
  }
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
