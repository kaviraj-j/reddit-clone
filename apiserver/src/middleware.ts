import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const jwtSecretKey = process.env.JWT_SECRET_KEY ?? "";
const prisma = new PrismaClient();

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
    return res
      .status(403)
      .json({ message: "Invalid token", type: "INVALID_TOKEN" });
  }
};

export const isCreatorOfSubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res
      .status(403)
      .json({ message: "Invalid token", type: "INVALID_TOKEN" });
  }
  const { subredditId } = req.params;
  try {
    console.log("Inside try block");
    const subreddit = await prisma.subReddit.findFirst({
      where: {
        id: subredditId,
      },
    });
    if (!subreddit) {
      return res.status(404).json({ message: "Subreddit not found" });
    }
    if (subreddit.createdById === user.id) {
      req.subreddit = subreddit;
      return next();
    }
    return res.status(403).json({ message: "User is not the creator" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
