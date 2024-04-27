const express = require("express");
const router = express.Router();
const { like, createPetAdopt } = require("../controllers/petAdopt");
router.route("/createProfile").post(createPetAdopt);
router.route("/like").post(like);
module.exports = router;
