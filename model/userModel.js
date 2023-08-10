const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  accountname: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  parentConfirmation: {
    type: Boolean,
    required: true,
  },
  profileImage: {
    type: String,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
});

// it work when parentConfirmation true
userSchema.add({
  guardianPhone: {
    type: String,
    required: function () {
      return this.parentConfirmation === true;
    },
  },
  guardianEmail: {
    type: String,
    required: function () {
      return this.parentConfirmation === true;
    },
  },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  // password is not modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // if password change then again generate the hash & salt it
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (userpassword) {
  try {
    // user password with DB password matching
    return await bcrypt.compare(userpassword, this.password);
  } catch (err) {
    throw err;
  }
};

// Generate the authentication token using JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, "SECRECT_KEY");
};

const User = mongoose.model("user", userSchema);
module.exports = { User };
