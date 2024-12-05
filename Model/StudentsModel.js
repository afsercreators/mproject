const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const StudentsModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  permanentsAddress: {
    type: String,
  },
});

const Student = mongoose.model("Student", StudentsModel);
module.exports = Student;
