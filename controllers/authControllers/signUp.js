const { User } = require("../../model");
const { validateSignUpInput, sendResponse } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.signUp = CatchAsync(async (req, res, next) => {
  const validationErrors = validateSignUpInput(req);
  if (validationErrors.length > 0) {
    sendResponse(200, validationErrors.join(", "), res);
    return;
  }

  const { accountname } = req.body;
  const accountExist = await User.findOne({ accountname });
  if (accountExist) {
    sendResponse(200, "This account name is already taken", res);
    return;
  }

  await User.create(req.body);

  sendResponse(200, "User registered successfully", res);
});
