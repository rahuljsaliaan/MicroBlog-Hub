const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// * Emit Events to all other microservices
app.post("/events", (req, res) => {
  const event = req.body;

  try {
    // Posts
    axios.post("http://localhost:4000/events", {
      event,
    });

    // Comments
    axios.post("http://localhost:4001/events", {
      event,
    });

    // Query
    axios.post("http://localhost:4002/events", {
      event,
    });

    res.send({
      status: "ok",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
