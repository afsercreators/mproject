const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const taskRoute = require("./Route/taskRoute");

app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send("<h1>We are Running & continue</h1>");
});

// Server code
app.listen(8000, () => {
  console.log("App is Running");
  mongoose
    .connect("mongodb+srv://class01:class01@cluster0.mbfkc.mongodb.net/class01")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error("Error occurred during Database Connection:", err);
    });
});
