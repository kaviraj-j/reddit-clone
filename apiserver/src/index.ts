import express, { Application, Request, Response } from "express";
import { SERVER_PORT } from "./configs/configs";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import subredditRouter from "./routes/subreddit";
import cors from "cors";
import postRouter from "./routes/post";

const app: Application = express();

app.use(express.json());
app.use(cors());

// ======== User Routers ========
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/subreddit", subredditRouter);
app.use("/post", postRouter);

// ======== Start Server =======
app.listen(SERVER_PORT, () => {
  console.log(`Listening On Port - ${SERVER_PORT}`);
});

app.listen();
