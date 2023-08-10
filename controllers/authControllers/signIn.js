const { User } = require("../../model");
const { sendResponse, sendToken } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.signIn = CatchAsync(async (req, res) => {
  const { accountname, password } = req.body;

  //  any field is empty
  if (!accountname || !password) {
    sendResponse(400, "All field must be filled", res);
    return;
  }
  if (accountname.includes(" ")) {
    sendResponse(400, "Invalid credentials", res);
    return;
  }

  // Check account name is exit or not !
  const userAccount = await User.findOne({
    accountname,
  });

  // user account not found
  if (!userAccount) {
    sendResponse(404, "Invalid credentials", res);
    return;
  }

  //
  else {
    // check DB credentials with user given credential's
    const isMatchpassword = await userAccount.comparePassword(password);
    if (isMatchpassword === false) {
      sendResponse(404, "Invalid credentials", res);
      return;
    }

    // Check Parent Confirmation True/false
    if (userAccount.parentConfirmation === true) {
      sendResponse(401, "This account is not verified", res);
      return;
    }
    await userAccount.save();

    // generate token
    const token = userAccount.getJwtToken();
    sendToken(200, "user successfully Login", res, userAccount, token);
  }
});
