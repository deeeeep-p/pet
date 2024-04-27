const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImage,
  createPet,
  getAllPets,
  getIMG,
} = require("../controllers/pet");
router.route("/imgs").post(upload.single("myFile"), uploadImage);
router.route("/imgs/:_id").get(getIMG);
// router.route("/getIMG/:parentElement").get(getIMG);
router.route("/createPet").post(createPet);
router.route("/getAllPets").post(getAllPets);
module.exports = router;
