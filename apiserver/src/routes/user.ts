import { Router, Request, Response } from "express";
import { getUsers } from "../db";
import { NewUser } from "../db/data-types";
import { newUserController } from "../controllers/user";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) => {
    const users = getUsers();
    res.send({msg: users})
})

userRouter.post("/", newUserController)

export default userRouter;
