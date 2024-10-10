import { Router } from "express";
import { isLoggedIn } from "../middleware";
import * as PostController from "../controllers/post";

const postRouter: Router = Router();

postRouter.post("/new", isLoggedIn, PostController.newPost);

export default postRouter;
