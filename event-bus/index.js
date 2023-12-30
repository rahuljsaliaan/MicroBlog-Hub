const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// Listen to event and emit events
app.post("/events", (req, res) => {
  // Emit Events to all other microservices
  try {
    const event = req.body;
    // Posts
    axios.post("http://localhost:4000/events", event);

    // Comments
    axios.post("http://localhost:4001/events", event);

    // Query
    axios.post("http://localhost:4002/events", event);

    res.send({
      status: "ok",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
