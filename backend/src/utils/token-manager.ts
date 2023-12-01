import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    const response = {
      status: 400,
      message: "Token not found",
      data: null,
    };
    return res.status(response.status).json(response);
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        const response = {
          status: 401,
          message: "Token Expired, Please login again",
          data: null,
        };
        return res.status(response.status).json(response);
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
