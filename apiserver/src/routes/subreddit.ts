import { Router, Request, Response } from "express";
import { isCreatorOfSubreddit, isLoggedIn } from "../middleware";
import * as SubRedditController from "../controllers/subreddit";

const subredditRouter: Router = Router();

subredditRouter.post(
  "/new",
  isLoggedIn,
  SubRedditController.createNewSubReddit
);

subredditRouter.get(
  "/follwed",
  isLoggedIn,
  SubRedditController.getUserFollwedSubReddits
);

subredditRouter.get("/", SubRedditController.getSubreddits);

subredditRouter.get("/:subredditName", SubRedditController.getSubRedditDetails);

subredditRouter
  .route("/:subredditId")
  .put(isLoggedIn, isCreatorOfSubreddit, SubRedditController.editSubreddit)
  .delete(
    isLoggedIn,
    isCreatorOfSubreddit,
    SubRedditController.deleteSubreddit
  );

subredditRouter.post(
  "/:subredditId/follow",
  isLoggedIn,
  SubRedditController.followSubreddit
);
// subredditRouter.post(
//   "/:subredditId/unfollow",
//   isLoggedIn,
//   SubRedditController.unfollowSubreddit
// );

export default subredditRouter;
