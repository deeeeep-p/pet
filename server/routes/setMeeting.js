const express = require("express");
const { sendMail } = require("../nodemailer/setAppointment");
const router = express.Router();
router.route("/setMeeting").get(sendMail);
module.exports = router;
