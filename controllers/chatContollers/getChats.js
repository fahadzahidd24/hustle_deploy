const { Chat } = require("../../model");
const { sendResponse, pagination } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.getChats = CatchAsync(async (req, res) => {
  const senderID = req.query.sender_id;
  const receiverID = req.query.receiver_id;

  const { page, limit, skip } = pagination(req);
  const userChats = await Chat.findOne({
    participants: { $all: [senderID, receiverID] },
  });

  if (userChats) {
    // pagination
    const messages = userChats.messages
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(skip, skip + limit);

    return sendResponse(200, "Success", res, messages);
  } else {
    return sendResponse(200, "Success!", res);
  }
});
