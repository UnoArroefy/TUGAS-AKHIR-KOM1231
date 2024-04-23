import { Router } from "express";
import { createPostController, deletePostController, getPostAllController, getPostByIdController, getPostbyMatkulController, getPostofUserController } from "../controllers/post.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkAuth, getPostAllController);
router.get("/:id", checkAuth, getPostByIdController);
router.get("/user/:id", checkAuth, getPostofUserController);
router.get("/matkul/:kode", checkAuth, getPostbyMatkulController);
router.post("/", checkAuth, createPostController);
router.delete("/:id", checkAuth, deletePostController);

export default router;