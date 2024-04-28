const express = require("express");
const router = express.Router();
const { createUserAdopt } = require("../controllers/userAdopt");
router.route("/createProfile").post(createUserAdopt);
// router.route("/like").post(like);
module.exports = router;
