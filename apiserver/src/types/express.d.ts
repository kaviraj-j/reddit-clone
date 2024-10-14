import { Prisma, Post, SubReddit } from "@prisma/client";
import { User } from ".";
declare global {
  namespace Express {
    interface Request {
      user?: User;
      subreddit?: SubReddit;
      post?: Post;
    }
  }
}
