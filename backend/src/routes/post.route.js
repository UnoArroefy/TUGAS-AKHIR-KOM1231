import { Router } from "express";
import { getPostAllController, getPostByIdController, getPostbyMatkulController, getPostofUserController } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPostAllController);
router.get("/:id", getPostByIdController);
router.get("/user/:id", getPostofUserController);
router.get("/matkul/:kode", getPostbyMatkulController);

export default router;