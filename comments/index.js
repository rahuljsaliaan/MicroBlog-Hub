const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

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

    const commentsByPostId = JSON.parse(
      await readFile(`${__dirname}/data/commentsByPostId.json`)
    );

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id, content });

    // example: {
    //   "postId": [
    //     "commentId": {
    //       "content": "this is a comment"
    //     }
    //   ]
    // }
    commentsByPostId[req.params.id] = comments;

    await writeFile(
      `${__dirname}/data/commentsByPostId.json`,
      JSON.stringify(commentsByPostId)
    );

    res.status(201).send(comments);
  } catch (error) {
    res.status(500).send({ error: "Error processing comments file" });
  }
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
