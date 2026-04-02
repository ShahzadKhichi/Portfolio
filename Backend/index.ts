import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db_connect from "./src/DB/Connect_DB"

dotenv.config({});

import publicRouter from "./src/Routes/public.route";
import userRouter from "./src/Routes/user.route";
import projectRouter from "./src/Routes/project.route";

const PORT: number = parseInt(process.env.PORT || "4000", 10);
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routers
app.use("/public/", publicRouter);
app.use("/api/user", userRouter);
app.use("/api/projects", projectRouter);

app.get("*", (req, res) => {
  res.status(200).json({
    active: true,
    error: false,
  });
});

(async () => {
  await db_connect();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port:${PORT}`);
  });
})();
