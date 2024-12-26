const Student = require("../Model/StudentsModel");

const CreateStudent = async (req, res) => {
  try {
    const { data } = req.body;

    const {
      name,
      fatherName,
      motherName,
      dateofBirth,
      className,
      presentAddress,
      permanentsAddress,
    } = data;

    // Checking required fields
    if (!name || !fatherName || !motherName || !dateofBirth) {
      return res
        .status(400)
        .json({ message: "Please provide the required fields" });
    }

    console.log(123);

    // Create a new student object
    const studentsObj = new Student({
      name,
      fatherName,
      motherName,
      dateofBirth,
      className,
      presentAddress,
      permanentsAddress,
    });

    // Save the student to the database
    await studentsObj.save();

    res.json({
      message: "Student created successfully",
      studentsObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the student.",
      error: error.message,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const studentsobj = await Student.find();
    res.status(200).json(studentsobj);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while get user.",
      error: error.message,
    });
  }
};

async function deletStudent(req, res) {
  const { id } = req.params;

  try {
    const newStudent = await Student.findByIdAndDelete({ _id: id });
    res.status(200).json({
      newStudent,
    });
  } catch (error) {
    console.error(errmsg);
    res.status(500).json({
      message: "An error occurred while updating the users",
    });
  }
}

async function updateStudent(req, res) {
  const { id } = req.params;

  try {
    const updatedStudents = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudents) {
      return res.status(404).json({
        message: "Users not found",
      });
    }
    res.status(200).json({
      updatedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Users",
    });
  }
}

async function getOneStudent(req, res) {
  const { id } = req.params;

  try {
    const students = await Student.findById({ _id: id });
    if (!students) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    res.status(200).json({
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Users",
    });
  }
}

module.exports = {
  CreateStudent,
  getStudent,
  getOneStudent,
  deletStudent,
  updateStudent,
};
