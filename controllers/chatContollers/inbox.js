const { User } = require("../../model");
const mongoose = require("mongoose");
const { sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.inbox = CatchAsync(async (req, res) => {
  const Inbox = await User.aggregate([
    {
      $match: {
        $and: [
          { parentConfirmation: false },
          { _id: { $ne: new mongoose.Types.ObjectId(req.params.user_id) } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profileImage: 1,
      },
    },
  ]);

  // if Inbox is empty
  if (Inbox.length === 0) {
    sendResponse(200, "I don't have any user with the parentConfirmation", res);
    return;
  }

  sendResponse(200, "Success", res, Inbox);
});
