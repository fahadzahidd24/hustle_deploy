const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const feedSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    caption: {
      type: String,
    },
    likes: {
      type: Array,
    },
    comments: [commentSchema],
    media: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model("feed", feedSchema);
module.exports = { Feed };
