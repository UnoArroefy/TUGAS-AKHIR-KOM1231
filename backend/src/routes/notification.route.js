import { Router } from "express";
import { getNotificationUserController } from "../controllers/notification.controller.js";

const router = Router();

router.get('/:id', getNotificationUserController);

export default router;