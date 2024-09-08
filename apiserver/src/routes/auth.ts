import { Router, Request, Response } from "express";

const authRouter: Router = Router();

// Signup route
authRouter.get("/signup", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  res.status(201).json({ message: "User signed up successfully!" });
});

// Login route
authRouter.get("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const isValidUser = true;

  if (isValidUser) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Email check route
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
