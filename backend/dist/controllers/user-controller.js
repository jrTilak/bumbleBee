import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { uniqueNamesGenerator, adjectives, names, starWars, } from "unique-names-generator";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const response = {
                status: 401,
                message: "User already exists",
                data: null,
            };
            return res.status(response.status).json(response);
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.FRONTEND_DOMAIN,
            signed: true,
            path: "/",
            sameSite: "none",
            secure: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.FRONTEND_DOMAIN,
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        });
        const response = {
            status: 201,
            message: "User registered successfully!",
            data: { name: user.name, email: user.email, credits: user.credits },
        };
        return res.status(response.status).json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: "Unknown error occurred. Try Again!",
            errors: error.message,
            data: null,
        };
        return res.status(response.status).json(response);
    }
};
export const userSignupAsGuest = async (req, res, next) => {
    try {
        //user signup as guest
        const name = uniqueNamesGenerator({
            dictionaries: [names, starWars, adjectives],
            length: 1,
        });
        const email = `${name.toLowerCase()}@guest_email.com`;
        const password = name.toLowerCase().split(" ").join("");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.FRONTEND_DOMAIN,
            signed: true,
            path: "/",
            sameSite: "none",
            secure: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.FRONTEND_DOMAIN,
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        });
        const response = {
            status: 201,
            message: "User registered successfully!",
            data: { name: user.name, email: user.email, credits: user.credits },
        };
        return res.status(response.status).json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: "Unknown error occurred. Try Again!",
            errors: error.message,
            data: null,
        };
        return res.status(response.status).json(response);
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const response = {
                status: 401,
                message: "User not registered",
                data: null,
            };
            return res.status(response.status).json(response);
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            const response = {
                status: 401,
                message: "Incorrect password, Try again!",
                data: null,
            };
            return res.status(response.status).json(response);
        }
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.FRONTEND_DOMAIN,
            signed: true,
            sameSite: "none",
            secure: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.FRONTEND_DOMAIN,
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true,
        });
        const response = {
            status: 200,
            message: "User logged in successfully!",
            data: { name: user.name, email: user.email, credits: user.credits },
        };
        return res.status(response.status).json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: "Unknown error occurred. Try Again!",
            errors: error.message,
            data: null,
        };
        return res.status(response.status).json(response);
    }
};
export const verifyUser = async (req, res, next) => {
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
        const response = {
            status: 200,
            message: "User verified successfully!",
            data: { name: user.name, email: user.email, credits: user.credits },
        };
        return res.status(response.status).json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: "Unknown error occurred. Try Again!",
            errors: error.message,
            data: null,
        };
        return res.status(response.status).json(response);
    }
};
export const userLogout = async (req, res, next) => {
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
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.FRONTEND_DOMAIN,
            signed: true,
            path: "/",
            sameSite: "none",
            secure: true,
        });
        const response = {
            status: 200,
            message: "User logged out successfully!",
            data: null,
        };
        return res.status(response.status).json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: "Unknown error occurred. Try Again!",
            errors: error.message,
            data: null,
        };
        return res.status(response.status).json(response);
    }
};
//# sourceMappingURL=user-controller.js.map