const express = require("express");
const route = express.Router();

// // import controllar
const {
  CreateTask,
  getTask,
  deletTask,
  updateTask,
} = require("../Controller/taskController");

// // api
route.get("/", getTask);
route.post("/", CreateTask);
route.patch("/:id", updateTask);
route.delete("/:id", deletTask);

// export
module.exports = route;
