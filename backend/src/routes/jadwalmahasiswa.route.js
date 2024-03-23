import { Router } from "express";
import {
    getJadwalMahasiswaAllController,
} from "../controllers/jadwalmahasiswa.controller.js";

const router = Router();
router.get("/", getJadwalMahasiswaAllController);

export default router;