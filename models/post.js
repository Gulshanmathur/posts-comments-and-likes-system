const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    comments : [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ],
  },
  {
    timestamps: true,
  } 
);

module.exports = mongoose.model("Post", postSchema);
