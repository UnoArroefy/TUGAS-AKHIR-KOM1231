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
import { checkAdmin, checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkAuth, getJadwalAllController);
router.get("/:id", checkAuth, getJadwalbyIdController);
router.get("/matkul/:id", checkAuth,getJadwalbyMatkulIdController);
router.post("/", checkAdmin, createJadwalController);
router.delete("/:id", checkAdmin, deleteJadwalController);
router.put("/:id", checkAdmin, updateJadwalController);
router.patch("/:id", checkAdmin, updateJadwalPartialController);

export default router;