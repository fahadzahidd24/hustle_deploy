const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error")

//middlewares.....
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorMiddleware)

//...... app routes....
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/feedRoutes"));
app.use("/api", require("./routes/chatRoutes"));

module.exports = app;
