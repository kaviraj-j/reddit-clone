import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "./types";
const jwtSecretKey = process.env.JWT_SECRET_KEY ?? "";

interface JwtPayoad {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  time: string;
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: User not logged in" });
  }
  try {
    const userDetails = jwt.verify(token, jwtSecretKey) as JwtPayoad;
    req.user = userDetails;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
