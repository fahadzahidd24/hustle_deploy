// auth controller's
const { signIn } = require("./authControllers/signIn");
const { signUp } = require("./authControllers/signUp");

// chat Controller's
const { getChats } = require("../controllers/chatContollers/getChats");
const { inbox } = require("../controllers/chatContollers/inbox");
const { sendMessage } = require("./chatContollers/sendMessage");

// feed Controller's
const { comments } = require("../controllers/feedControllers/comments");
const {
  createComments,
} = require("../controllers/feedControllers/createComments");
const { createfeed } = require("./feedControllers/createfeed");
const { feed } = require("./feedControllers/feed");
const { likes } = require("../controllers/feedControllers/likes");

// job Controller's
const { jobs } = require("./jobControllers/jobs");
const { createJobs } = require("./jobControllers/createJobs");

// userController's
const { updateUser } = require("./userControllers/updateUser");
const { userFeed } = require("../controllers/userControllers/userFeed");

module.exports = {
  signUp,
  signIn,
  jobs,
  createJobs,
  createfeed,
  updateUser,
  feed,
  likes,
  userFeed,
  comments,
  createComments,
  getChats,
  sendMessage,
  inbox,
};
