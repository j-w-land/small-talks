/* const db = require("../db");

const posts = db.get().collection("posts");

// Create and Save a new Tutorial
exports.create = (req, res) => {};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {}; */

var Post = require("../models/post");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
/* const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter"); */

// Display list of all posts.
exports.index = function (req, res, next) {
  const userId = req.params.userId;
  console.log(userId);

  /*  const anime = await Anime.findById(animeId, (anime) => anime); */

  Post.find({}).exec(function (err, list_posts) {
    if (err) {
      return next(err);
    }

    res.json(list_posts);
  });
};

// Display list of all posts.
exports.postsByUser = function (req, res, next) {
  const params = req.params;

  const userId = req.params.userId;

  /*  const anime = await Anime.findById(animeId, (anime) => anime); */

  Post.find({ userName: userId }).exec(function (err, list_posts) {
    if (err) {
      return next(err);
    }

    res.json(list_posts);
  });
};

// Handle book create on POST.
exports.create = async function (req, res, next) {
  sanitizeBody("*").trim().escape();

  // Create a post object
  // Improve: Use promises with .then()
  var post = new Post({
    userName: req.body.username,
    content: req.body.content,
    userId: req.body.userId,
  });

  post.save(function (err) {
    if (err) {
      return next(err);
    }

    res.json({ message: "created" }).send();
  });
};
