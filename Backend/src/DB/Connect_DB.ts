import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const db_connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("DB Connection Successful");
  } catch (error) {
    console.error(error, "DB Connection Failed");
  }
};

export default db_connect;
