const { Feed } = require("../../model");
const { pagination, sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.feed = CatchAsync(async (req, res) => {
  const { page, limit, skip } = pagination(req);

  // Your query pipeline with pagination
  const result = await Feed.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        caption: 1,
        media: 1,
        createdAt: 1,
        likes: 1,
        comments: 1,
        "user.firstname": 1,
        "user.lastname": 1,
        "user.profileImage": 1,
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  sendResponse(200, "Successfully get myfeeds", res, result);
  return;
});
