import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
export const createNewSubReddit = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json("Invalid request");
  }
  const newSubRedditDetails: Prisma.SubRedditCreateInput = {
    ...req.body,
    createdById: req.user.id,
    followedBy: {
      connect: {
        id: req.user.id
      }
    },
  };

  try {
    const newSubReddit = await prisma.subReddit.create({
      data: newSubRedditDetails,
    });
    if (!newSubReddit) {
      throw new Error("Error creating subreddit");
    }
    res.status(201).json({
      message: "Subreddit created successfully",
      subredditId: newSubReddit.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating subreddit" });
  }
};

export const getUserFollwedSubReddits = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json("Invalid request");
  }
  const user = await prisma.user.findFirst({ where: { id: req.user.id } });
  
  if (user) {
    const subReddits = await prisma.subReddit.findMany({
      where: {
        followedBy: {
          some: {
            id: user.id,
          },
        },
      },
    });
    return res.status(200).json({data: subReddits, message: "Subreddits found"})
  }
  return res.status(401).json("User not found")
};
