const express = require("express");
const router = express.Router();
const { like, createUserAdopt } = require("../controllers/userAdopt");
router.route("/createProfile").post(createUserAdopt);
// router.route("/like").post(like);
module.exports = router;
