import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db_connect from "./src/DB/Connect_DB"

dotenv.config({});

import publicRoutes from "./src/Routes/public.route";
import userRoutes from "./src/Routes/user.route";
import projectRoutes from "./src/Routes/project.route";
import profileRoutes from "./src/Routes/profile.route";
import skillRoutes from "./src/Routes/skill.route";
import messageRoutes from "./src/Routes/message.route";
import typewriterRoutes from "./src/Routes/typewriter.route";

const app: express.Application = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routers
app.use("/api", publicRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/typewriter", typewriterRoutes);

app.get("*", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    active: true,
    error: false,
  });
});

(async () => {
  await db_connect();
  app.listen(port, () => {
    console.log(`server started on port:${port}`);
  });
})();
