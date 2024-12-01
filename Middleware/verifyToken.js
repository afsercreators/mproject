const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, "123");

    console.log(decoded);

    if (!decoded) {
      return res.status(400).json({
        message: "Unthorized",
      });
    }
    res.status(200).json({
      message: "Verify Sucessfuly",
    });
  } catch (error) {
    return res.status(400).json({ message: "Authentication failed" });
  }
};

module.exports = tokenVerify;
