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

export const getPostDetails = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const postDetails = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!postDetails) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ type: "success", data: postDetails });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const postDetails = req.post;
    if (!postDetails) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { title, description } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: postDetails.id },
      data: {
        title: title || postDetails.title,
        description: description || postDetails.description,
      },
    });
    return res
      .status(200)
      .json({ type: "success", data: "Post details edited successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postDetails = req.post;
    if (!postDetails) {
      return res.status(404).json({ message: "Post not found" });
    }
    await prisma.post.delete({
      where: { id: postDetails.id },
    });
    return res
      .status(200)
      .json({ type: "success", data: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
