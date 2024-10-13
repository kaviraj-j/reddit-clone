import { Subreddit, User } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      subreddit: Subreddit;
    }
  }
}
