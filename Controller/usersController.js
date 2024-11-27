const Userlist = require("../Model/UserModel");
var jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const CreateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (!email || !password) {
      return res.json({ message: "Email and Password  is required." });
    }

    const userObj = new Userlist({
      email,
      password: hash,
    });

    await userObj.save();

    res.json({
      message: "Created Successfully",
      userObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the users.",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const usersobj = await Userlist.find();

    res.json(usersobj);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while get user.",
      error: error.message,
    });
  }
};

async function deletUser(req, res) {
  const { id } = req.params;

  try {
    const newUsers = await Userlist.findByIdAndDelete(id);
    res.status(200).json({
      newUsers,
    });
  } catch (error) {
    console.error(errmsg);
    res.status(500).json({
      message: "An error occurred while updating the users",
    });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;

  try {
    const updatedUsers = await Userlist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUsers) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    res.status(200).json({
      updatedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Users",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  console.log(123, email, password);

  try {
    // 1st condition
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both Email and Password" });
    }

    const user = await Userlist.findOne({ email });
    // 2nd
    if (!user) {
      return res.status(401).json({
        message: "This Email does not have any account !!",
      });
    }
    //3rd condi
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(402).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ email }, "123", {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Users",
    });
  }
}

module.exports = {
  CreateUser,
  getUser,
  deletUser,
  updateUser,
  login,
};
