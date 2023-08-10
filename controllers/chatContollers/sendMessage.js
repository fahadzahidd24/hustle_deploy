const { Chat, User } = require("../../model");
const { sendResponse, pushMessage } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.sendMessage = CatchAsync(async (req, res) => {
  const { senderID } = req.body;
  const { receiverID } = req.body;
  const content = req.body.content;

  const sender = await User.findById(senderID);
  const receiver = await User.findById(receiverID);

  if (!content) {
    return sendResponse(404, "message is empty", res);
  }

  if (!sender || !receiver) {
    return sendResponse(404, "User not found", res);
  }

  const message = {
    senderID: senderID,
    receiverID: receiverID,
    content,
  };

  // chat already exit of participants
  let privateChat = await Chat.findOne({
    participants: {
      $all: [senderID, receiverID],
    },
  });

  // set new chat of participants
  if (!privateChat) {
    privateChat = new Chat({
      participants: [senderID, receiverID],
    });
  }

  privateChat.messages.push(message);
  await privateChat.save();
  await pushMessage(message, receiverID);
  sendResponse(200, "Success!", res);
});
