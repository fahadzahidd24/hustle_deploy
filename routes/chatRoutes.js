const express = require("express");
const router = express.Router();

// Controller's
const { sendMessage, getChats, inbox } = require("../controllers");

// Routes...
router.post("/send-message", sendMessage);
router.get("/getChats", getChats);
router.get("/inbox/:user_id", inbox);

module.exports = router;
