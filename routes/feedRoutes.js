const express = require("express");
const router = express.Router();

// Controller's
const {
  jobs,
  createfeed,
  feed,
  likes,
  createComments,
  comments,
  createJobs,
} = require("../controllers");
const { upload } = require("../utils");

// Routes...
router.post("/createJobs", createJobs);
router.get("/jobs", jobs);
router.post("/createFeed", upload.array("file"), createfeed);
router.get("/feeds", feed);
router.put("/likes", likes);
router.put("/createComments", createComments);
router.get("/comments/:post_id", comments);
module.exports = router;
