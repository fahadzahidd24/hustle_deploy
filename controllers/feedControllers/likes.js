const { sendResponse } = require("../../utils/sendResponse");
const { Feed } = require("../../model");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.likes = CatchAsync(async (req, res) => {
  const { user_id, post_id } = req.body;
  const post = await Feed.findById(post_id);

  if (!post) {
    // If the post with the given ID doesn't exist in the database
    sendResponse(404, "Post not found", res);
    return;
  }

  // Check if user_id is already in the likes array of the post
  const index = post.likes.indexOf(user_id);

  if (index === -1) {
    // If the user_id is not in the likes array, add it
    post.likes.push(user_id);
  } else {
    // If the user_id is already in the likes array, remove it
    post.likes.splice(index, 1);
  }

  await post.save();
  sendResponse(200, "Likes updated", res, post);
});
