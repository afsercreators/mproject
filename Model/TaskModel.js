const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskModel = new Schema({
  taskTitle: { type: String },
});

const TaskModel = mongoose.model("TaskList", taskModel);
module.exports = TaskModel;
