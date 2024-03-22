import { Router } from "express";
import {
    getMatkulAllController,
    getMatkulbyIdController,
    createMatkulController,
    deleteMatkulController,
} from "../controllers/matkul.controller.js";

const router = Router();

router.get("/", getMatkulAllController);
router.get("/:id", getMatkulbyIdController);
router.post("/", createMatkulController);
router.delete("/:id", deleteMatkulController);

export default router;