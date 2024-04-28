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
  const lat = "19.1258452";
  const long = "72.8166552";
  let info = await transporter.sendMail({
    from: '"Vinod Thapa 👻" <thapa@gmail.com>', // sender address
    to: "iam@gmail.com", // list of receivers
    subject: "location of the pet", // Subject line
    text: `your cat was found in this location at last: https://www.google.com/maps/@${lat},${long}11z?entry=ttu`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // res.json(info);
};

module.exports = { sendMail };
