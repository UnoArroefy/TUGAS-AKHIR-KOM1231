import { Router } from "express";
import {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController
} from "../controllers/jadwalmatkul.controller.js";

const router = Router();

router.get("/", getJadwalAllController);
router.post("/", createJadwalController);
router.get("/:id", getJadwalbyMatkulIdController);

export default router;