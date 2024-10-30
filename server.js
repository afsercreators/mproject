const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>We are Running & continue</h1>");
});

const TaskModel = require("./TaskModel");

app.post("/api/create", async (req, res) => {
  try {
    const { taskTitle } = req.body;

    if (!taskTitle) {
      return res.json({ message: "Task title is required." });
    }

    const taskObj = new TaskModel({
      taskTitle,
    });

    await taskObj.save();

    res.json({
      message: "Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
});

app.get("/api/", async (req, res) => {
  try {
    const taskObj = await TaskModel.find();

    res.json(taskObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
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
