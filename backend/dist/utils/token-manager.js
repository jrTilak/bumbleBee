import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        const response = {
            status: 400,
            message: "Cookies not found, Please login again!",
            data: null,
        };
        return res.status(response.status).json(response);
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                const response = {
                    status: 401,
                    message: "Token Expired, Please login again!",
                    data: null,
                };
                return res.status(response.status).json(response);
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map