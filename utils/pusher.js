const Pusher = require("pusher");
var pusher = new Pusher({
  appId: "1646565",
  key: "0a8dd6c75efa8c042997",
  secret: "a2959a3d0cd2d3804f27",
  cluster: "ap2",
  useTLS: true,
});

exports.pushMessage = async (message, userID) => {
  await pusher.trigger("OneToOne", `chat-${userID}`, {
    message: message,
  });
};
