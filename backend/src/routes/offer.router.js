import { Router } from "express";
import {
    getOfferAllController,
    getOfferbyIdController,
    getOfferofPostController,
    createOfferController,
    deleteOfferController,
} from "../controllers/offer.controller.js"


const router = Router();

router.get("/", getOfferAllController);
router.get("/:id", getOfferbyIdController);
router.get("/post/:id", getOfferofPostController);
router.post("/", createOfferController);
router.delete("/:id", deleteOfferController);

export default router;