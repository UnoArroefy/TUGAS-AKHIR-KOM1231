const express = require("express");

const router = express.Router();

const {
    getMatkulAllController,
    getMatkulbyIdController,
    createMatkulController,
    deleteMatkulController,
} = require("../controllers/matkul.controller");

router.get("/", getMatkulAllController);
router.get("/:id", getMatkulbyIdController);
router.post("/", createMatkulController);
router.delete("/:id", deleteMatkulController);

module.exports = router;