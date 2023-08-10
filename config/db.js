const mongoose = require("mongoose");
const colors = require("colors");

const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://aliyousaf:lakerdouble@clustername.r6egydd.mongodb.net/?retryWrites=true&w=majority");
    console.log("MongoDB connected".bgMagenta);
    return true;
  } catch (error) {
    console.error(error.message);
    console.error(error.name);
    return false;
  }
};

module.exports = mongoConnection;
