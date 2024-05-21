import { Router } from "express";
import matkul from "./matkul.route.js";
import mahasiswa from "./mahasiswa.route.js";
import jadwalmatkul from "./jadwalmatkul.route.js";
import jadwalmahasiswa from "./jadwalmahasiswa.route.js"
import post from "./post.route.js";
import offer from "./offer.router.js"
import auth from "./auth.route.js"
import notification from "./notification.route.js";

const router = Router();

router.use("/matkul", matkul);
router.use("/mahasiswa", mahasiswa);
router.use("/jadwal-matkul", jadwalmatkul);
router.use("/jadwal-mahasiswa", jadwalmahasiswa);
router.use("/post", post);
router.use("/offer", offer);
router.use("/auth", auth);
router.use("/notification", notification);

export default router;