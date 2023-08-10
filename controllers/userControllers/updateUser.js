const { User } = require("../../model");
const bcrypt = require("bcryptjs");
const { uploadToCloudinary } = require("../../utils");
const { CatchAsync } = require("../../middlewares/CatchAsyncError");

exports.updateUser = CatchAsync(async (req, res) => {
  const { _id, firstname, lastname, accountname, password, DOB } = req.body;

  // Check account name is already taken
  const existingUser = await User.findOne({ accountname: accountname });
  if (existingUser && existingUser._id.toString() !== _id) {
    return res.status(400).json({
      message: "Account name already taken.",
    });
  }

  // Prepare the update object
  const updateObject = {
    firstname,
    lastname,
    accountname,
    DOB,
  };

  // Check if password needs to be updated
  if (password !== "null") {
    // Validate the password
    const passwordValidation =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      return res.status(400).json({
        message: "password must be in proper pattern",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(password, salt);
    updateObject.password = HashPassword;
  }

  // Check if req.file exists and is not empty
  if (req.file && req.file.path) {
    const data = await uploadToCloudinary(req.file.path, "user-image");
    updateObject.profileImage = data.url;
  }

  // Update the user profile
  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    updateObject,
    { new: true } // This option will make sure the updated document is returned
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    data: updatedUser,
    message: "Update successfully",
  });
});
