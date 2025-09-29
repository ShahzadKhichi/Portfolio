const mongoose = require("mongoose");
require("dotenv").config({});

const db_connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connection Successful");
  } catch (error) {
    console.error(error, "DB Connection Failed");
  }
};

module.exports = db_connect;
