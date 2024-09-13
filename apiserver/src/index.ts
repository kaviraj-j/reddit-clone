import express, {Application, Request, Response} from "express";
import { SERVER_PORT } from "./configs/configs";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";


const app: Application = express();

app.use(express.json());

// ======== User Routers ========
app.use("/auth", authRouter);
app.use("/users", userRouter);

// ======== Start Server =======
app.listen(SERVER_PORT, () => {
    console.log(`Listening On Port - ${SERVER_PORT}`)
})

app.listen()
