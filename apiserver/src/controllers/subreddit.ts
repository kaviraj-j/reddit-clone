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
