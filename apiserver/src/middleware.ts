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
    return next();
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

export const isAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userDetails = req.user;
  const { postId } = req.params;
  if (!userDetails) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.authorId === userDetails.id) {
    req.post = post;
    return next();
  }
  return res
    .status(403)
    .json({ message: "You are not the author of the post" });
};

export const isCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userDetails = req.user;
  const { commentId } = req.params;
  if (!userDetails) {
    return res.status(403).json({ message: "Unauthorized request" });
  }
  const commentDetails = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!commentDetails) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (commentDetails.userId === userDetails.id) {
    req.comment = commentDetails;
    return next();
  }
  return res
    .status(403)
    .json({ message: "You are not the author of the post" });
};
