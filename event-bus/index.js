const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");
const { randomBytes } = require("crypto");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const fileLocation = `${__dirname}/data/events.json`;

const app = express();

app.use(express.json());

// Listen to event and emit events
app.post("/events", async (req, res) => {
  // Emit Events to all other microservices
  try {
    const eventsObj = JSON.parse(await readFile(fileLocation));

    const events = eventsObj.events || [];

    const event = req.body;

    events.push(event);

    eventsObj.events = events;

    await writeFile(fileLocation, JSON.stringify(eventsObj, null, 2));

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
