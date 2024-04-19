import { Router } from "express";
import { createPostController, deletePostController, getPostAllController, getPostByIdController, getPostbyMatkulController, getPostofUserController } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPostAllController);
router.get("/:id", getPostByIdController);
router.get("/user/:id", getPostofUserController);
router.get("/matkul/:kode", getPostbyMatkulController);
router.post("/", createPostController);
router.delete("/:id", deletePostController);

export default router;