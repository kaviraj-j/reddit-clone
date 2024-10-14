import { Router } from "express";
import { isAuthor, isLoggedIn } from "../middleware";
import * as PostController from "../controllers/post";

const postRouter: Router = Router();

postRouter.post("/new", isLoggedIn, PostController.newPost);
postRouter.get("/", PostController.getPosts);
postRouter
  .route("/:postId")
  .get(PostController.getPostDetails)
  .put(isLoggedIn, isAuthor, PostController.editPost)
  .delete(isLoggedIn, isAuthor, PostController.deletePost);

export default postRouter;
