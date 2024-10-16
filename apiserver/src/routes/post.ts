import { Router } from "express";
import { isAuthor, isLoggedIn, isCommentOwner } from "../middleware";
import * as PostController from "../controllers/post";

const postRouter: Router = Router();

postRouter.post("/new", isLoggedIn, PostController.newPost);
postRouter.get("/", PostController.getPosts);

postRouter
  .route("/:postId")
  .get(PostController.getPostDetails)
  .put(isLoggedIn, isAuthor, PostController.editPost)
  .delete(isLoggedIn, isAuthor, PostController.deletePost);

postRouter.post("/:postId/upvote", isLoggedIn, PostController.upvotePost);
postRouter.post("/:postId/downvote", isLoggedIn, PostController.downvotePost);

postRouter
  .route("/:postId/comment")
  .post(isLoggedIn, PostController.addComment)
  .get(PostController.getComments);

postRouter
  .route("/comment/:commentId")
  .put(isLoggedIn, isCommentOwner, PostController.editComment)
  .delete(isLoggedIn, isCommentOwner, PostController.deleteComment);

export default postRouter;
