import {
    getMahasiswaAll,
    getMahasiswabyId,
    createMahasiswa,
    deleteMahasiswa
} from "../services/mahasiswa.service.js";

export const getMahasiswaAllController = async (req, res) => {
    const mahasiswa = await getMahasiswaAll();
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "No Mahasiswa yet" });
    }
    return res.status(200).json(mahasiswa);
}

export const getMahasiswabyIdController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json(mahasiswa);
}

export const createMahasiswaController = async (req, res) => {
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

export const deleteMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await deleteMahasiswa(id);
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json({ message: "Mahasiswa deleted successfully" });
};