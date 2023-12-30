const express = require("express");
const cors = require("cors");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();

app.use(express.json());

app.use(cors());

app.get("/query", async (req, res) => {
  try {
    const posts = await JSON.parse(readFile(`${__dirname}/data/posts.json`));

    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error reading posts file" });
  }
});

// Listen to
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  const posts = await JSON.parse(readFile(`${__dirname}/data/posts.json`));

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };

    await writeFile(`${__dirname}/data/posts.json`, JSON.stringify(posts));
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });

    await writeFile(`${__dirname}/data/posts.json`, JSON.stringify(posts));
  }
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
