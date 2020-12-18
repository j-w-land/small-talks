var User = require("../models/user");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult, check } = require("express-validator");
const { sanitizeBody } = require("express-validator");
/* const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter"); */

// Display list of all posts.
exports.index = function (req, res, next) {
  const userId = req.params.userId;
  console.log(userId);

  /*  const anime = await Anime.findById(animeId, (anime) => anime); */

  User.find({}).exec(function (err, result) {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
};

exports.login = async function (req, res, next) {
  body("*").trim().escape();

  const userName = req.body.username;

  // Check if user exists. ********************************/

  const checkUser = await checkUserExist(req.body.username).catch();

  if (checkUser == null) {
    return res.status(404).send({
      success: false,
      error: "User not found",
      status: false,
    });
  }

  if (checkUser.password != req.body.password) {
    return res.status(404).send({
      success: false,
      error: "Username and password did not match. Please try again.",
      status: false,
    });
  }

  var user = new User({
    userName: req.body.username,
    password: req.body.password,
  });

  user.save(function (err, response) {
    if (err) {
      return next(err);
    }

    res
      .json({
        message: "success",
        username: checkUser.userName,
        id: checkUser._id,
        status: true,
      })
      .send();
  });
};

const checkUserExist = async (userName) => {
  try {
    let result = await User.findOne({ userName: userName }).exec();
    return result;
  } catch (error) {}
};

// Handle book create on POST.
exports.create = async function (req, res, next) {
  body("*").trim().escape();

  const userName = req.body.username;

  // Check if user exists. ********************************/

  const checkUser = await checkUserExist(req.body.username).catch();

  if (checkUser != null) {
    return res.status(404).send({
      success: false,
      error: "User name already registered. Kindly try another one!",
    });
  }

  var user = new User({
    userName: req.body.username,
    password: req.body.password,
  });

  user.save(function (err, response) {
    if (err) {
      return next(err);
    }

    res
      .json({
        message: "success",
        username: req.body.username,

        status: true,
      })
      .send();
  });
};
