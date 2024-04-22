import { Router } from "express";
import {
    getMatkulAllController,
    getMatkulbyIdController,
    createMatkulController,
    deleteMatkulController,
    updateMatkulController,
    updateMatkulPartialController,
} from "../controllers/matkul.controller.js";

const router = Router();

router.get("/", getMatkulAllController);
router.get("/:id", getMatkulbyIdController);
router.post("/", createMatkulController);
router.delete("/:id", deleteMatkulController);
router.put("/:id", updateMatkulController);
router.patch("/:id", updateMatkulPartialController);

export default router;