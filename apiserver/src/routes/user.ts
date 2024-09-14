import { Router, Request, Response } from "express";
import { getUsers } from "../db";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) => {
    const users = getUsers();
    res.send({msg: users})
})

export default userRouter;
