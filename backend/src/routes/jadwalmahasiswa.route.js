import { Router } from "express";
import {
    getJadwalMahasiswaAllController,
    getJadwalMahasiswaController,
    createJadwalMahasiswaController,
    deleteJadwalMahasiswaController,
} from "../controllers/jadwalmahasiswa.controller.js";

const router = Router();

router.get("/", getJadwalMahasiswaAllController);
router.get("/:id", getJadwalMahasiswaController);
router.post("/", createJadwalMahasiswaController);
router.delete("/:id", deleteJadwalMahasiswaController);

export default router;