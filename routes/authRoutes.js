const express = require("express");
const router = express.Router();

// Controller's
const { signUp, signIn } = require("../controllers");
const { isAuth } = require("../middlewares/isAuth");

// Routes...
router.get("/isAuth", isAuth);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
module.exports = router;
