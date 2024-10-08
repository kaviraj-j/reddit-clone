import { Router, Request, Response } from "express";
import * as AuthController from "../controllers/auth";
import { isLoggedIn } from "../middleware";

const authRouter: Router = Router();

authRouter.post("/signup", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.get("/validate", isLoggedIn, AuthController.validate);

authRouter.get("/emailcheck/:email", (req: Request, res: Response) => {
  const email: string = req.params.email || "";

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Should be a valid email" });
  }

  const isEmailPresent: boolean = true;

  if (isEmailPresent) {
    res.redirect("/login");
  } else {
    res.redirect("/signup");
  }
});

export default authRouter;
