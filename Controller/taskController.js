const TaskModel = require("../Model/TaskModel");

const CreateTask = async (req, res) => {
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
      taskObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
};

const getTask = async (req, res) => {
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
};

async function deletTask(req, res) {
  const { id } = req.params;

  try {
    const newTask = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({
      newTask,
    });
  } catch (error) {
    console.error(errmsg);
    res.status(500).json({
      message: "An error occurred while updating the Account Head",
    });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;

  console.log(id);

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the task",
    });
  }
}

module.exports = {
  CreateTask,
  getTask,
  deletTask,
  updateTask,
};
