const { Feed } = require("../../model");
const { pagination, sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.comments = CatchAsync(async (req, res) => {
  const _id = req.params.post_id;
  const { page, limit, skip } = pagination(req);
  // find post
  const post = await Feed.findById(_id);

  // post not found!
  if (!post) {
    sendResponse(404, "Post not found!", res);
    return;
  }

  // aggregate Post Details
  const result = await Feed.aggregate([
    { $match: { _id: post._id } },
    {
      $lookup: {
        from: "users",
        localField: "comments.user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        comments: {
          $filter: {
            input: "$comments",
            as: "comment",
            cond: {
              $eq: ["$$comment.user_id", "$user._id"],
            },
          },
        },
        "user.firstname": 1,
        "user.lastname": 1,
        "user.profileImage": 1,
      },
    },
    {
      $sort: { "comments.createdAt": -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  sendResponse(200, "Successfully get comments", res, result);
  return;
});
