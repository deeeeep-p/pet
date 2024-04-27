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

const addPet = async (req, res) => {
  try {
    const exists = await Pet.findOne({ user: req.body.user });
    if (exists) {
      return res
        .status(409)
        .json({ message: "pet is already present", exists });
    } else {
      const pet = await Pet.create(req.body);
      return res.status(201).json({ pet });
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
    const user = await User.findOne({ email: req.body.email });
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
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.body.user });
    return res.status(200).json({ pets });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = { createUser, addPet, getUser, getAllPets };
