import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connctDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
export default connctDB;
