import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import genAI from "../config/gemini.config.js";
import { SYSTEM_INSTRUCTIONS } from "../utils/constants.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      const response = {
        status: 401,
        message: "User not registered OR Token malfunctioned",
        data: null,
      };
      return res.status(response.status).json(response);
    }

    if (user.credits <= 0) {
      const response = {
        status: 402,
        message: "Insufficient credits, Try next day!",
        data: null,
      };
      return res.status(response.status).json(response);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTIONS,
    });

    const chat = model.startChat({
      history: (user.chats || []).map((chat) => {
        return {
          role: chat.role,
          parts: chat.parts.map((part) => {
            return {
              text: part.text,
            };
          }),
        };
      }),
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    user.chats.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await chat.sendMessage(message);
    const r = await result.response;
    const text = r.text();

    user.chats.push({
      role: "model",
      parts: [{ text: text }],
    });

    user.credits -= 1;

    await user.save();
    const response = {
      status: 200,
      message: "OK",
      data: text,
    };
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    const response = {
      status: 500,
      message: error.message ?? "Something went wrong, Please try again!",
    };
    return res.status(response.status).json(response);
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({
      message: "OK",
      data: {
        chats: user.chats,
        credits: user.credits,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      const response = {
        status: 401,
        message: "User not registered OR Token malfunctioned",
        data: null,
      };
      return res.status(response.status).json(response);
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      const response = {
        status: 401,
        message: "Permissions didn't match",
        data: null,
      };
      return res.status(response.status).json(response);
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    const response = {
      status: 200,
      message: "Conversation deleted successfully!",
      data: null,
    };
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    const response = {
      status: 500,
      message: "Something went wrong, Please try again!",
      data: error.message,
    };
    return res.status(response.status).json(response);
  }
};
