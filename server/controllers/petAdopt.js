const PetAdopt = require("../models/petAdopt");
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
