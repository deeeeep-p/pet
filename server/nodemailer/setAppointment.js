const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "yvette26@ethereal.email",
      pass: "QJtBYSm2xPAFJ9NWv5",
    },
  });
  let info = await transporter.sendMail({
    from: '"Vinod Thapa " <thapa@gmail.com>', // sender address
    to: "Vineet@fortis.com", // list of receivers
    subject: "Reminder about the Apponitment ", // Subject line
    text: `Your appointmenr has been setup for 22-04-24, at 5pm est`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  res.send("Message sent: %s", info.messageId);
  // res.json(info);
};

module.exports = { sendMail };
