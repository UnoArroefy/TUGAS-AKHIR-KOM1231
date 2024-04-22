import { Router } from "express";
import {
    getMahasiswaAllController,
    getMahasiswabyIdController,
    createMahasiswaController,
    deleteMahasiswaController,
    updateMahasiswaController,
    updateMahasiswaPartialController
} from "../controllers/mahasiswa.controller.js";

const router = Router();

router.get("/", getMahasiswaAllController);
router.get("/:id", getMahasiswabyIdController);
router.post("/", createMahasiswaController);
router.delete("/:id", deleteMahasiswaController);
router.put("/:id", updateMahasiswaController);
router.patch("/:id", updateMahasiswaPartialController);

export default router;
