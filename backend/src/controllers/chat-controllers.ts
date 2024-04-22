import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { configureOpenAI } from "../config/openai.config.js";
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

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    user.credits -= 1;

    await user.save();
    const response = {
      status: 200,
      message: "OK",
      data: chatResponse.data.choices[0].message,
    };
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    const response = {
      status: 500,
      message: "OpenAI Credits exhausted, Please contact support!",
      data: error.message,
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
    return res.status(200).json({ message: "OK", data: user.chats });
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
