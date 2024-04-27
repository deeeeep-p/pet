const User = require("../models/User");
const multer = require("multer");
const fs = require("fs");
const { get } = require("http");
// Multer storage configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for file uploads
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log(ext);
    cb(null, `file-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

const uploadImage = async (req, res) => {
  try {
    // Find the pet by _id
    const findUser = await Pet.findOne({ _id: req.body._id });
    if (!findUser) {
      return res.status(404).send("Pet not found");
    }

    // Save the new image path to the pet
    findUser.image = req.file.path;
    await findUser.save();

    // Send a success response
    res.send("File successfully uploaded and saved to database.");
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
};
const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(409)
        .json({ message: "User is already present", exists });
    } else {
      const user = await User.create(req.body);
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (user.password == req.body.password) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.error(err);
    // Handle the error and send an appropriate response
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};
const getIMG = async (req, res) => {
  try {
    const image = await User.findOne({
      parentElement: req.params.parentElement,
    });
    const path = image.image;

    // Set the appropriate Content-Type header based on file extension
    const contentType = "image/" + path.split(".").pop();
    console.log(path.split(".").pop());
    // const contentType = "image/" + "jpeg";
    res.setHeader("Content-Type", contentType);

    // Stream the file directly to the response
    const stream = fs.createReadStream(path);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser,
  uploadImage,
  upload,
  uploadImage,
  getIMG,
};
