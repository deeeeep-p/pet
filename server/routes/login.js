const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/login");
router.route("/").post(createUser);
// router.route("/:email/:pwd").get(findUser);
module.exports = router;
