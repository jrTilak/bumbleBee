import { connect, disconnect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URL || "");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed");
    console.log(err);
  }
};

export const disconnectDB = async () => {
  try {
    await disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.log("MongoDB disconnection failed");
    console.log(err);
  }
};
