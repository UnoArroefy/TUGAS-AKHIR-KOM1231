import { Router } from "express";
import {
    getMahasiswaAllController,
    getMahasiswabyIdController,
    createMahasiswaController,
    deleteMahasiswaController,
} from "../controllers/mahasiswa.controller.js";

const router = Router();

router.get("/", getMahasiswaAllController);
router.get("/:id", getMahasiswabyIdController);
router.post("/", createMahasiswaController);
router.delete("/:id", deleteMahasiswaController);

export default router;
