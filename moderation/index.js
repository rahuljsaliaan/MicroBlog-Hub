const express = require("express");
const Filter = require("bad-words");
const axios = require("axios");

const filter = new Filter();
filter.addWords("orange");

const app = express();

app.use(express.json());

// Listen to Comments Created event
app.post("/events", async (req, res) => {
  console.log("Received Event 🚀", req.body.type);
  try {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
      const { id, content, postId } = data;
      console.log(data, "🤪💥👋");

      const status = filter.isProfane(content) ? "rejected" : "approved";

      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
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
    res.status(500).send({ message: "Error Processing Moderation" });
  }
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
