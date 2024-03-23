import { Router } from "express";
import {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController,
    deleteJadwalController,
} from "../controllers/jadwalmatkul.controller.js";

const router = Router();

router.get("/", getJadwalAllController);
router.get("/:id", getJadwalbyMatkulIdController);
router.post("/", createJadwalController);
router.delete("/:id", deleteJadwalController);

export default router;