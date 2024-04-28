const nodemailer = require("nodemailer");

const sendMail = async () => {
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
    from: '"Vinod Thapa 👻" <thapa@gmail.com>', // sender address
    to: "iam@gmail.com", // list of receivers
    subject: "Hello Thapa", // Subject line
    text: "Hello YT Thapa", // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // res.json(info);
};
sendMail();

// module.exports = sendMail;
