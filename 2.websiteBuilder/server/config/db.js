import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error:", error.message);
    throw error;
  }
};

export default connectDb;