const app = require("./app");
const dotenv = require("dotenv");
const mongoConnection = require("./config/db");
const colors = require("colors");

dotenv.config();

// if DB connect then server will start.
(async () => {
  const isConnected = await mongoConnection();

  if (isConnected) {
    app.use('/', (req,res)=>{
      res.send("Hello");
    });
    app.listen(4000, () => {
      console.log(
        `Server started at http://localhost:4000`.bgYellow
      );
    });
  } else {
    console.error("Database connection failed. Server not started.".bgRed);
  }
})();
