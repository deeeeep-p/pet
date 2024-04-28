const express = require("express");
const router = express.Router();
const { like, createPetAdopt } = require("../controllers/petAdopt");
router.route("/createProfile").post(createPetAdopt);
router.route("/like").post(like);
router.route("/displayAll").get(displayAll);
module.exports = router;
