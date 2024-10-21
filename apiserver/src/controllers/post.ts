import { Prisma, PrismaClient, VoteType } from "@prisma/client";
import { Request, Response } from "express";
import * as PostService from "../services/post";
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

    const { title, content, subredditId, ...rest } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const subredditDetails = prisma.subReddit.findFirst({
      where: {
        id: subredditId,
      },
    });

    if (subredditId && !subredditDetails) {
      return res.status(400).json({ message: "Invalid Subreddit details" });
    }

    const postDetails: Prisma.PostCreateInput = {
      title,
      content,
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
    const subredditName = queryParams.subredditName?.toString() ?? "";
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

    console.log({ subredditName, subreddit });

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
      include: {
        author: true,
      },
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
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: postDetails.id },
      data: {
        title: title || postDetails.title,
        content: content || postDetails.content,
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

export const upvotePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!req.user) {
      return res.status(404).json({ type: "error", data: "User not found" });
    }

    const postDetails = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postDetails) {
      return res.status(404).json({ type: "error", data: "Post not found" });
    }
    const voteExist = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          postId: postDetails.id,
          userId: req.user?.id,
        },
      },
    });
    if (voteExist?.voteType === "UPVOTE") {
      return res
        .status(405)
        .json({ message: "Already upvoted", type: "error" });
    }

    await PostService.createVote(
      voteExist,
      postDetails.id,
      req.user.id,
      "UPVOTE"
    );
    return res
      .status(200)
      .json({ type: "success", data: "Upvoted post successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const downvotePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!req.user) {
      return res.status(404).json({ type: "error", data: "User not found" });
    }

    const postDetails = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postDetails) {
      return res.status(404).json({ type: "error", data: "Post not found" });
    }
    const voteExist = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          postId: postDetails.id,
          userId: req.user?.id,
        },
      },
    });
    if (voteExist && voteExist.voteType === "DOWNVOTE") {
      return res
        .status(405)
        .json({ message: "Already downvoted", type: "error" });
    }

    await PostService.createVote(
      voteExist,
      postDetails.id,
      req.user.id,
      "DOWNVOTE"
    );

    return res
      .status(200)
      .json({ type: "success", data: "Downvoted post successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!req.user) {
      return res.status(404).json({ type: "error", data: "User not found" });
    }

    const postDetails = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postDetails) {
      return res.status(404).json({ type: "error", data: "Post not found" });
    }

    const content: string = req.body.content;
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id,
        post: {
          connect: {
            id: postDetails.id,
          },
        },
      },
    });
    return res.status(200).json({
      type: "success",
      message: "Commented Successfully",
      data: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return res.status(200).json({
      type: "success",
      data: comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = req.comment;

    if (!comment) {
      return res.status(404).json({ type: "error", data: "Comment not found" });
    }
    const content: string = req.body.content;
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });
    return res
      .status(200)
      .json({ type: "success", data: "Comment updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = req.comment;

    if (!comment) {
      return res.status(404).json({ type: "error", data: "Comment not found" });
    }
    const content: string = req.body.content;
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return res
      .status(200)
      .json({ type: "success", data: "Comment deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
