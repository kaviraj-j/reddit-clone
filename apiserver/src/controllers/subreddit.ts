import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { Subreddit } from "../types";
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
        id: req.user.id,
      },
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
    return res
      .status(200)
      .json({ data: subReddits, message: "Subreddits found" });
  }
  return res.status(401).json("User not found");
};

export const getSubRedditDetails = async (req: Request, res: Response) => {
  const { subredditName } = req.params;
  try {
    const subReddit = await prisma.subReddit.findFirst({
      where: {
        name: {
          equals: subredditName,
        },
      },
    });
    return res.status(200).json({ data: subReddit });
  } catch (err) {
    console.log(err);
  }
};

export const editSubreddit = async (req: Request, res: Response) => {
  try {
    const subreddit: Subreddit = req.subreddit;
    if (!subreddit) {
      return res.status(404).json({ message: "Subreddit not found" });
    }

    const { bannerImageUrl, description, iconImageUrl } = req.body;
    if (bannerImageUrl) {
      subreddit.bannerImageUrl = bannerImageUrl;
    }
    if (description) {
      subreddit.description = description;
    }
    if (iconImageUrl) {
      subreddit.iconImageUrl = iconImageUrl;
    }

    await prisma.subReddit.update({
      where: {
        id: subreddit.id,
      },
      data: { ...subreddit },
    });
    return res.status(200).json({ message: "Subreddit edited successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSubreddit = async (req: Request, res: Response) => {
  try {
    const subreddit: Subreddit = req.subreddit;
    if (!subreddit) {
      return res.status(404).json({ message: "Subreddit not found" });
    }
    await prisma.subReddit.delete({
      where: {
        id: subreddit.id,
      },
    });
    return res.status(200).json({ message: "Subreddit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
