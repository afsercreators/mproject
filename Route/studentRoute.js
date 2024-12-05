const express = require("express");
const route = express.Router();

// // import controllar
const {
  CreateStudent,
  getStudent,
  getOneStudent,
  deletStudent,
  updateStudent,
} = require("../Controller/studentController");

// // api
route.get("/", getStudent);
route.post("/", CreateStudent);
route.patch("/:id", updateStudent);
route.delete("/:id", deletStudent);
route.get("/:id", getOneStudent);

// export
module.exports = route;
