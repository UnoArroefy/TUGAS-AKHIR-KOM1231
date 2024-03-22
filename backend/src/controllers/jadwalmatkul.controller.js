const { getJadwalAll, createJadwal, getJadwalbyMatkulId } = require("../services/jadwalmatkul.service");

const getJadwalAllController = async (req, res) => {
    const jadwal = await getJadwalAll();
    if (!jadwal.length) {
        return res.status(404).json({ message: "No Jadwal yet" });
    }
    return res.status(200).json(jadwal);
}

const createJadwalController = async (req, res) => {
    const data = req.body;
    if (!data.mataKuliahId || !data.hari || !data.jam || !data.ruangan) {
        return res.status(404).json({ message: "Invalid input" });
    }

    try {
        await createJadwal(data);
        res.status(200).json({ message : "Jadwal created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

const getJadwalbyMatkulIdController = async (req, res) => {
    const id = req.params.id;
    const jadwal = await getJadwalbyMatkulId(id);
    if (!jadwal.length) {
        return res.status(404).json({ message: "Jadwal not found" });
    }
    return res.status(200).json(jadwal);
}

module.exports = {
    getJadwalAllController,
    createJadwalController,
    getJadwalbyMatkulIdController
}