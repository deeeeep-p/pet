const express = require("express");
const router = express.Router();

const {
  createUser,
  addPet,
  getUser,
  getAllPets,
  upload,
  uploadImage,
  getIMG,
} = require("../controllers/login");
router.route("/imgs").post(upload.single("myFile"), uploadImage);
router.route("/imgs/:_id").get(getIMG);
router.route("/").post(createUser);
router.route("/get").post(getUser);
// router.route("/:email/:pwd").get(findUser);
module.exports = router;
