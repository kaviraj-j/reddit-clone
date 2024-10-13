import { Prisma, User, Post } from "@prisma/client";
import { Subreddit, User } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      subreddit: Subreddit;
    }
  }
}
