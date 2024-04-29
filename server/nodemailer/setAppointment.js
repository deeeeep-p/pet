const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    // Connect with the SMTP server
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "yvette26@ethereal.email",
        pass: "QJtBYSm2xPAFJ9NWv5",
      },
    });

    // Compose the email message
    let info = await transporter.sendMail({
      from: '"Vinod Thapa " <thapa@gmail.com>', // sender address
      to: "Vinod@fortis.com", // list of receivers
      subject: "Reminder about the Appointment", // Subject line
      text: `Your appointment has been setup for 22-04-24, at 5pm IST`, // Plain text body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).send("Error occurred while sending email");
  }
};

module.exports = { sendMail };
