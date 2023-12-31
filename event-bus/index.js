const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// Listen to event and emit events
app.post("/events", async (req, res) => {
  // Emit Events to all other microservices
  try {
    const event = req.body;

    // Posts
    await axios.post("http://localhost:4000/events", event);

    // Comments
    await axios.post("http://localhost:4001/events", event);

    // Query
    await axios.post("http://localhost:4002/events", event);

    // Moderation
    await axios.post("http://localhost:4003/events", event);

    res.send({
      status: "ok",
    });
  } catch (error) {
    console.error("Error processing events:", error);
    res.status(500).send({ message: "Error Processing Events" });
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
