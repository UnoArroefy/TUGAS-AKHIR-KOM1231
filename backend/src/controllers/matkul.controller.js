const {
    getMatkulAll,
    getMatkulbyId,
    createMatkul,
    deleteMatkulbyId,
} = require("../services/matkul.service");

const getMatkulAllController = async (req, res) => {
    const matkuls = await getMatkulAll();
    if (!matkuls) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json(matkuls);
};

const getMatkulbyIdController = async (req, res) => {
    const id = req.params.id;
    const matkul = await getMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json(matkul);
};

const createMatkulController = async (req, res) => {
    const data = req.body;
    data.sks = parseInt(data.sks);
    console.log(data.sks)
    if (!data.nama || !data.kode || !data.sks) {
        return res.status(404).json({ message: "Invalid input" });
    }

    try {
        await createMatkul(data);
        res.status(200).json({ message: "Mata Kuliah created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, " + error});
    }
};

const deleteMatkulController = async (req, res) => {
    const id = req.params.id;
    const matkul = await deleteMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json({ message: "Matkul deleted successfully"});
};

module.exports = {
    getMatkulAllController,
    getMatkulbyIdController,
    createMatkulController,
    deleteMatkulController
}