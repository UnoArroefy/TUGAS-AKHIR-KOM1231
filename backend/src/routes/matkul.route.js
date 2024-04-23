import { Router } from "express";
import {
    getMatkulAllController,
    getMatkulbyIdController,
    createMatkulController,
    deleteMatkulController,
    updateMatkulController,
    updateMatkulPartialController,
} from "../controllers/matkul.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkAuth, getMatkulAllController);
router.get("/:id", checkAuth, getMatkulbyIdController);
router.post("/", checkAdmin,createMatkulController);
router.delete("/:id", checkAdmin, deleteMatkulController);
router.put("/:id", checkAdmin, updateMatkulController);
router.patch("/:id", checkAdmin,updateMatkulPartialController);

export default router;