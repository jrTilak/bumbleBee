import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-route.js";

const appRouter = Router();

appRouter.get("/user", userRoutes);
appRouter.get("/chats", chatRoutes);

export default appRouter;
