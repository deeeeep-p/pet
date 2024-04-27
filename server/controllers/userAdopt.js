const UserAdopt = require("../models/userAdopt");
const createUserAdopt = async (req, res) => {
  try {
    const userAdopt = await UserAdopt.create(req.body);
    return res.status(200).json({ userAdopt });
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = { createUserAdopt };
// Path: server/models/userAdopt.js
