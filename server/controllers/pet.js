const Pet = require("../models/Pet");

const multer = require("multer");
const fs = require("fs");
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
    const findPet = await Pet.findOne({ _id: req.body._id });
    if (!findPet) {
      return res.status(404).send("Pet not found");
    }

    // Save the new image path to the pet
    findPet.image = req.file.path;
    await findPet.save();

    // Send a success response
    res.send("File successfully uploaded and saved to database.");
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
};

// const getAllImgs = async (req, res) => {
//   try {
//     // Fetch all image documents from the database
//     const allImages = await Image.find();
//     const path = allImages[0].image;

//     // Set the appropriate Content-Type header based on file extension
//     const contentType = "image/" + path.split(".").pop();
//     res.setHeader("Content-Type", contentType);

//     // Stream the file directly to the response
//     const stream = fs.createReadStream(path);
//     stream.pipe(res);
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching images:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const getIMG = async (req, res) => {
  try {
    const image = await Pet.findOne({
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

const createPet = async (req, res) => {
  try {
    console.log("inputxx");
    const newPet = await Pet.create(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message || "Internal Server Error" });
  }
};

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.body.user });
    return res.status(200).json({ pets });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = {
  upload,
  uploadImage,
  multerStorage,
  createPet,
  getAllPets,
  getIMG,
};
//hello
