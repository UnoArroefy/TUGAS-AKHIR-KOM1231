import { Router } from "express";
import {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController,
    deleteJadwalController,
    getJadwalbyIdController,
    updateJadwalController,
    updateJadwalPartialController
} from "../controllers/jadwalmatkul.controller.js";

const router = Router();

router.get("/", getJadwalAllController);
router.get("/:id", getJadwalbyIdController);
router.get("/matkul/:id", getJadwalbyMatkulIdController);
router.post("/", createJadwalController);
router.delete("/:id", deleteJadwalController);
router.put("/:id", updateJadwalController);
router.patch("/:id", updateJadwalPartialController);

export default router;