import { Router } from "express";
import matkul from "./matkul.route.js";
import mahasiswa from "./mahasiswa.route.js";
import jadwalmatkul from "./jadwalmatkul.route.js";
import jadwalmahasiswa from "./jadwalmahasiswa.route.js"

const router = Router();

router.use("/matkul", matkul);
router.use("/mahasiswa", mahasiswa);
router.use("/jadwalmatkul", jadwalmatkul);
router.use("/jadwalmahasiswa", jadwalmahasiswa);

export default router;