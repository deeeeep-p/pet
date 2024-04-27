const mongoose = require("mongoose");
const PetAdopt = require("../models/petAdopt");
const userAdopt = require("../models/userAdopt");
const createPetAdopt = async (req, res) => {
  try {
    const petAdopt = await PetAdopt.create(req.body);
    return res.status(200).json({ petAdopt });
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const like = async (req, res) => {
  try {
    // Check if userAdoptId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(req.body.userAdoptId)) {
      return res.status(400).json({ err: "Invalid userAdoptId" });
    }

    const petAdopt = await PetAdopt.findOne({ _id: req.body.petAdoptId });
    if (petAdopt.likedBy.includes(req.body.userAdoptId)) {
      console.log("Already liked");
      return res.status(200).json({ petAdopt });
    }
    petAdopt.likedBy.push(req.body.userAdoptId);
    await petAdopt.save();
    // No need to call save() after updateOne, as updateOne already updates the document in the database
    return res.status(200).json({ petAdopt });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = { createPetAdopt, like };
