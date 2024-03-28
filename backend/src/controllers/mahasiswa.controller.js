import {
    getMahasiswaAll,
    getMahasiswabyId,
    getMahasiswabyNIM,
    getMahasiswabyEmail,
    createMahasiswa,
    deleteMahasiswa
} from "../services/mahasiswa.service.js";

import { createMahasiswaValidation } from "../validations/mahasiswa.validation.js";

export const getMahasiswaAllController = async (req, res) => {
    const mahasiswa = await getMahasiswaAll();
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(mahasiswa);
}

export const getMahasiswabyIdController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json(mahasiswa);
}

export const createMahasiswaController = async (req, res) => {
    const data = req.body;
    const {error, value} = createMahasiswaValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const uniqueNIM = await getMahasiswabyNIM(value.nim);
    if (uniqueNIM) {
        return res.status(404).json({ message: "NIM already exists" });
    }

    const uniqueEmail = await getMahasiswabyEmail(value.email);
    if (uniqueEmail) {
        return res.status(404).json({ message: "Email already exists" });
    }

    try {
        await createMahasiswa(value);
        res.status(200).json({ message : "Mahasiswa created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
};

export const deleteMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    try {
        await deleteMahasiswa(id);
        return res.status(200).json({ message: "Mahasiswa deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};