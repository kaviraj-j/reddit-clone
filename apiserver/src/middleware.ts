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
  const { subredditName } = req.params;
  try {
    const subreddit = await prisma.subReddit.findFirst({
      where: {
        name: subredditName,
      },
    });
    if (!subreddit) {
      throw new Error("Subreddit not found");
    }
    if (subreddit.createdById === user.id) {
      next();
    }
    throw new Error("User is not the subreddit creator");
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};
