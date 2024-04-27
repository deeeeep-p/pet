require("dotenv").config();
const express = require("express");
const cors = require("cors");
const url = process.env.MONG_URI;
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors()); // CORS middleware
const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose.connect(url);
};
const forum = require("./routes/forum");
const login = require("./routes/login");
const pet = require("./routes/pet");
const petAdopt = require("./routes/petAdopt");
const userAdopt = require("./routes/userAdopt");
app.use("/api/forum", forum);
app.use("/api/login", login);
app.use("/api/pet", pet);
app.use("/api/petAdopt", petAdopt);
app.use("/api/userAdopt", userAdopt);
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

const QRCode = require("qrcode");
typeof QRCode.toString(
  "http://192.168.178.70:5500/client/html/whta.html",
  {
    errorCorrectionLevel: "H",
    type: "png",
  },
  function (err, data) {
    if (err) throw err;
    console.log(data);
  }
);

start();
