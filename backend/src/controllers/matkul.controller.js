import {
    getMatkulAll,
    getMatkulbyId,
    createMatkul,
    deleteMatkulbyId,
} from "../services/matkul.service.js";

export const getMatkulAllController = async (req, res) => {
    const matkuls = await getMatkulAll();
    if (!matkuls) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json(matkuls);
};

export const getMatkulbyIdController = async (req, res) => {
    const id = req.params.id;
    const matkul = await getMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json(matkul);
};

export const createMatkulController = async (req, res) => {
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

export const deleteMatkulController = async (req, res) => {
    const id = req.params.id;
    const matkul = await deleteMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }
    return res.status(200).json({ message: "Matkul deleted successfully"});
};