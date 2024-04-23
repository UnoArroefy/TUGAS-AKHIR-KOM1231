import { Router } from "express";
import { loginController, logoutController } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/login", loginController);
router.post("/logout", checkAuth, logoutController);

export default router;