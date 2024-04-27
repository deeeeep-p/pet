const nodemailer = require("nodemailer");

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adoptpleasedontshop@gmail.com",
      pass: "Deeppatel@1D",
    },
  });

  let mailOptions = {
    from: "adoptpleasedontshop@gmail.com",
    to: "deep.patel22@spit.ac.imn",
    subject: "Test Email",
    text: "Hello, this is a test email from Nodemailer!",
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);
