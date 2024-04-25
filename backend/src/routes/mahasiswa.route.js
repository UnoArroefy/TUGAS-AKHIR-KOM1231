import { Router } from "express";
import {
    getMahasiswaAllController,
    getMahasiswabyIdController,
    createMahasiswaController,
    deleteMahasiswaController,
    updateMahasiswaController,
    updateMahasiswaPartialController
} from "../controllers/mahasiswa.controller.js";
import { checkAdmin, checkAuth, checkRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkAdmin, getMahasiswaAllController);
router.get("/:id", checkAuth, getMahasiswabyIdController);
router.post("/", checkRole, createMahasiswaController);
router.delete("/:id", checkAuth, deleteMahasiswaController);
router.put("/:id", checkAuth, updateMahasiswaController);
router.patch("/:id", checkAuth, updateMahasiswaPartialController);

export default router;
