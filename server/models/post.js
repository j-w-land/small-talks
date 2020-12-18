var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  userId: { type: String },
  userName: { type: String },
  content: { type: String },
  author: { type: String },
});

// Export model.
module.exports = mongoose.model("Post", PostSchema);
