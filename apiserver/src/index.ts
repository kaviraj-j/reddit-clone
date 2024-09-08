import express, {Application, Request, Response} from "express";
import { SERVER_PORT } from "./configs/configs";
import authRouter from "./routes/auth";


const app: Application = express();

app.use(express.json());

// ======== Use Routers ========
app.use("/auth", authRouter);

// ======== Start Server =======
app.listen(SERVER_PORT, () => {
    console.log(`Listening On Port - ${SERVER_PORT}`)
})

app.listen()
