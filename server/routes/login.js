const express = require("express");
const router = express.Router();
const { createUser, addPet,getUser } = require("../controllers/login");
router.route("/").post(createUser).get();
router.route("/addPet").post(addPet);
// router.route("/:email/:pwd").get(findUser);
module.exports = router;
