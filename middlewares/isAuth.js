const { CatchAsync } = require("./CatchAsyncError");
const jwt = require("jsonwebtoken");
const { User } = require("../model/index");
const { sendResponse } = require("../utils");

exports.isAuth = CatchAsync(async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (token) {
    jwt.verify(token, "SECRECT_KEY", async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: "auth is inValid!",
          success: false,
        });
      } else {
        const CheckAuthUser = await User.findOne({ _id: decoded.id });
        if (!CheckAuthUser) {
          return sendResponse(404, "User Not Found!", res);
        } else {
          CheckAuthUser.password = null;
          return sendResponse(200, "User Valid", res, CheckAuthUser);
        }
      }
    });
  } else {
    return sendResponse(404, "Token not found!", res);
  }
});
