import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  parts: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no two users can have the same email
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  chats: [chatSchema],
  credits: {
    type: Number,
    default: 10,
  },
});

export default mongoose.model("User", userSchema);
