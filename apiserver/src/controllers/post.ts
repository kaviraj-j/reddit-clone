import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface PostFilter {
  subredditId?: string;
  authorId?: string;
}

export const newPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User must be logged in to create a post" });
    }

    const { title, description, subredditId, ...rest } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const subredditDetails = prisma.subReddit.findFirst({
      where: {
        id: subredditId,
      },
    });

    if (!subredditDetails) {
      return res.status(400).json({ message: "Invalid Subreddit details" });
    }

    const postDetails: Prisma.PostCreateInput = {
      title,
      description,
      authorId: userId,
      subredditId: subredditId,
      ...rest,
    };

    const newPost = await prisma.post.create({ data: postDetails });

    return res.status(201).json({
      message: "New Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;
    const subredditName = queryParams.subReddit?.toString() ?? "";
    const userId = queryParams.userId?.toString() ?? "";
    let subreddit = null;
    if (subredditName) {
      subreddit = await prisma.subReddit.findFirst({
        where: { name: subredditName },
      });
      if (!subreddit) {
        throw new Error("Subreddit doesn't exists");
      }
    }

    const filter: PostFilter = {};
    if (subreddit) {
      filter.subredditId = subreddit.id;
    }
    if (userId) {
      filter.authorId = userId;
    }

    const posts = await prisma.post.findMany({
      where: filter,
      skip: 0,
      take: 10,
    });

    return res.status(200).json({ type: "success", data: posts });
  } catch (error) {
    return res.status(400).json({ message: "Error in getting posts" });
  }
};
