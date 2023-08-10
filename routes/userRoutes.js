const express = require("express");
const router = express.Router();

const { updateUser, userFeed } = require("../controllers");
const { upload } = require("../utils");

router.put("/userUpdate", upload.single("profilePic"), updateUser);
router.get("/userFeed/:userID", userFeed);
module.exports = router;
