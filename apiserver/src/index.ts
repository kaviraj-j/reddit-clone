import express, { Application } from "express";
import { SERVER_PORT } from "./configs/configs";
import { authRouter, subredditRouter, postRouter, userRouter } from "./routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

// ======== Use Routers ========
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/subreddit", subredditRouter);
app.use("/post", postRouter);

// ======== Start Server =======
app.listen(SERVER_PORT, () => {
  console.log(`Listening On Port - ${SERVER_PORT}`);
});

app.listen();
