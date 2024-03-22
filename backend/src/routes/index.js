const express = require("express");

const router = express.Router();

const matkul = require("./matkul.route");
router.use("/matkul", matkul);

const mahasiswa = require("./mahasiswa.route");
router.use("/mahasiswa", mahasiswa);

const jadwalmatkul = require("./jadwalmatkul.route");
router.use("/jadwalmatkul", jadwalmatkul);

module.exports = router;