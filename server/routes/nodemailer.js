const express = require("express");
const { sendMail } = require("../nodemailer/nodemailer");
const router = express.Router();
router.route("/sendmail").get(sendMail);
module.exports = router;
