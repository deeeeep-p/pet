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

const login = require("./routes/login");
app.use("/api/login", login);

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

start();
