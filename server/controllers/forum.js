const Element = require("../models/Element");

const createElement = async (req, res) => {
  try {
    const content = {
      user: req.body.user,
      string: req.body.string,
      parentElement: req.body.parentElement,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    };
    const element = await Element.create(content);
    return res.status(201).json({ element });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};
const editElement = async (req, res) => {
  try {
    const id = req.body.id;
    const toPerform = req.body.toPerform;
    const incOrDec = req.body.incOrDec;
    const element = await Element.findOne({ _id: id });
    if (!element) {
      return res.status(404).json({ err: "Question/answer not found" });
    }
    if (toPerform === "like") {
      element.likes += incOrDec === "inc" ? 1 : -1;
    } else if (toPerform === "dislike") {
      element.dislikes += incOrDec === "inc" ? 1 : -1;
      element.likes -= incOrDec === "dec" ? 1 : -1;
    }

    await element.save();
    return res.status(200).json({ element });
  } catch (err) {
    console.log(err);
  }
};

const getAllElements = async (req, res) => {
  try {
    let query = {};
    console.log(req.body);
    query.parentElement = req.body.parentElement
      ? req.body.parentElement
      : null;
    const element = await Element.find(query);
    return res.status(200).json({ element });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = {
  // createQuestion,
  // getQuestion,
  // edit,
  // createAnswer,
  // getAnswers,
  // getAll,
  createElement,
  editElement,
  getAllElements,
};
// Path: server/models/Question.js
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("image");

//       await newImage.save();

//       return res.status(200).send("Image uploaded successfully!");
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
