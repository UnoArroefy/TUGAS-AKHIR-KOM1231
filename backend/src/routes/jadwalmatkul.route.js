const express = require("express");

const router = express.Router();

const {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController
} = require("../controllers/jadwalmatkul.controller");

router.get("/", getJadwalAllController);
router.post("/", createJadwalController);
router.get("/:id", getJadwalbyMatkulIdController);
module.exports = router;