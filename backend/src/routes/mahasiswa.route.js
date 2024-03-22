const express = require("express");

const router = express.Router();

const {
    getMahasiswaAllController,
    getMahasiswabyIdController,
    createMahasiswaController,
    deleteMahasiswaController,
} = require("../controllers/mahasiswa.controller");

router.get("/", getMahasiswaAllController);
router.get("/:id", getMahasiswabyIdController);
router.post("/", createMahasiswaController);
router.delete("/:id", deleteMahasiswaController);

module.exports = router;