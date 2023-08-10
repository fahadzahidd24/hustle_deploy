const { Feed } = require("../../model");
const { sendResponse, pagination } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.userFeed = CatchAsync(async (req, res) => {
  const { page, limit, skip } = pagination(req);

  const userPost = await Feed.find({ userID: req.params.userID })
    .skip(skip)
    .limit(limit);

  sendResponse(200, "Successfully get all posts", res, userPost);
});
