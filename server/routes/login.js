const express = require("express");
const router = express.Router();
const {
  createUser,
  addPet,
  getUser,
  getAllPets,
} = require("../controllers/login");
router.route("/").post(createUser).get(getUser);
router.route("/addPet").post(addPet);
router.route("/getAllPets").get(getAllPets);
// router.route("/:email/:pwd").get(findUser);
module.exports = router;
