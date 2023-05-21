const UserData = require("../models/userDataModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST user data
// @route POST /userData/register

const uploadUserData = async (req, res) => {
  try {
    const { email } = req.body;
    const count = await UserData.countDocuments({ email: email });

    if (count > 0) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      const data = new UserData(req.body);
      const save = await data.save();
      res
        .status(200)
        .send({ message: "User registered successfully", alert: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user data
// @route GET /userData/getUserData

const getUserData = async (req, res) => {
  try {
    const userData = await UserData.find().sort({ firstName: 1 });

    res.status(200).json({
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = uploadUserData;

module.exports = { uploadUserData, getUserData };
