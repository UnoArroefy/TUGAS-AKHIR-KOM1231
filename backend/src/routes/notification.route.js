import { Router } from "express";
import { deleteNotificationAllController, deleteNotificationController, getNotificationUserController } from "../controllers/notification.controller.js";
import { checkAuth } from "../middlewares/auth.js"
const router = Router();

router.get('/:id', checkAuth, getNotificationUserController);
router.delete('/user/:id', checkAuth, deleteNotificationAllController);
router.delete('/:id', checkAuth, deleteNotificationController);

export default router;