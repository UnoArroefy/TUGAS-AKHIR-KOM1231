import { Router } from "express";
import {
    getJadwalMahasiswaAllController,
    getJadwalMahasiswaController,
    getJadwalMahasiswabyIdController,
    createJadwalMahasiswaController,
    deleteJadwalMahasiswaController,
} from "../controllers/jadwalmahasiswa.controller.js";

const router = Router();

router.get("/", getJadwalMahasiswaAllController);
router.get("/:id", getJadwalMahasiswabyIdController);
router.get("/user/:id", getJadwalMahasiswaController);
router.post("/", createJadwalMahasiswaController);
router.delete("/:id", deleteJadwalMahasiswaController);

export default router;