const {
    getMahasiswaAll,
    getMahasiswabyId,
    createMahasiswa,
    deleteMahasiswa
} = require("../services/mahasiswa.service");

const getMahasiswaAllController = async (req, res) => {
    const mahasiswa = await getMahasiswaAll();
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "No Mahasiswa yet" });
    }
    return res.status(200).json(mahasiswa);
}

const getMahasiswabyIdController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json(mahasiswa);
}

const createMahasiswaController = async (req, res) => {
    const data = req.body;
    if (!data.nama || !data.nim || !data.email || !data.password) {
        return res.status(404).json({ message: "Invalid input" });
    }

    try {
        await createMahasiswa(data);
        res.status(200).json({ message : "Mahasiswa created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
};

const deleteMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await deleteMahasiswa(id);
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json({ message: "Mahasiswa deleted successfully" });
};

module.exports = {
    getMahasiswaAllController,
    getMahasiswabyIdController,
    createMahasiswaController,
    deleteMahasiswaController
}