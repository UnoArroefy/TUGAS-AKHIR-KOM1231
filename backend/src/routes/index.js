const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is the home page");
});

const matkul = require("./matkul.route");
router.use("/matkul", matkul);

const mahasiswa = require("./mahasiswa.route");
router.use("/mahasiswa", mahasiswa);

module.exports = router;