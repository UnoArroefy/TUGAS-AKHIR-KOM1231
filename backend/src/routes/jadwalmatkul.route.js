import { Router } from "express";
import {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController,
    deleteJadwalController,
    getJadwalbyIdController
} from "../controllers/jadwalmatkul.controller.js";

const router = Router();

router.get("/", getJadwalAllController);
router.get("/:id", getJadwalbyIdController);
router.get("/matkul/:id", getJadwalbyMatkulIdController);
router.post("/", createJadwalController);
router.delete("/:id", deleteJadwalController);

export default router;