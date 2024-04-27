const User = require("../models/User");
const Pet = require("../models/Pet");
const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(409)
        .json({ message: "User is already present", exists });
    } else {
      const user = await User.create(req.body);
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (user.password == req.body.password) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = { createUser, getUser };
