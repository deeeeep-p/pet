const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(409)
        .json({ message: "User is already present", exists });
    } else {
      const user = await User.create(req.body);
      return res.status(201).json({ user });
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};
module.exports = { createUser };
