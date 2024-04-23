import { Router } from "express";
import {
    getJadwalMahasiswaAllController,
    getJadwalMahasiswaController,
    getJadwalMahasiswabyIdController,
    createJadwalMahasiswaController,
    deleteJadwalMahasiswaController,
} from "../controllers/jadwalmahasiswa.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkAuth, getJadwalMahasiswaAllController);
router.get("/:id", checkAuth, getJadwalMahasiswabyIdController);
router.get("/user/:id", checkAuth, getJadwalMahasiswaController);
router.post("/", checkAuth, createJadwalMahasiswaController);
router.delete("/:id", checkAuth, deleteJadwalMahasiswaController);

export default router;