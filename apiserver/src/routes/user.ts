import { Router, Request, Response } from "express";
import { getUsers } from "../db";

const userRouter: Router = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send({ msg: users });
});

export default userRouter;
