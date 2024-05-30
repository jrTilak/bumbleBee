import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-route.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats
appRouter.use("/health", (req, res) => res.send("Server is up and running!"));

export default appRouter;
