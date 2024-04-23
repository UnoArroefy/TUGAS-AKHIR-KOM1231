import { Router } from "express";
import {
    getOfferAllController,
    getOfferbyIdController,
    getOfferofPostController,
    createOfferController,
    deleteOfferController,
    acceptOfferController,
} from "../controllers/offer.controller.js"
import { checkAuth } from "../middlewares/auth.js";


const router = Router();

router.get("/", checkAuth, getOfferAllController);
router.get("/:id", checkAuth, getOfferbyIdController);
router.get("/post/:id", checkAuth, getOfferofPostController);
router.post("/", checkAuth, createOfferController);
router.delete("/:id", checkAuth, deleteOfferController);
router.patch("/:id", checkAuth, acceptOfferController);

export default router;