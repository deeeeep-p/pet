const express = require("express");
const router = express.Router();
// const {
//   getAllImgs,
//   upload,
//   uploadImage,
//   getIMG,
// } = require("../controllers/img");
const {
  createElement,
  editElement,
  getAllElements,
} = require("../controllers/forum");

router.route("/createElement").post(createElement);
router.route("/editElement").post(editElement);
router.route("/getAllElements").post(getAllElements);

// router
//   .route("/imgs")
//   .post(upload.single("myFile"), uploadImage)
//   .get(getAllImgs);

// router.route("/getIMG/:parentElement").get(getIMG);

module.exports = router;
