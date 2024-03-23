import {
    getMatkulAll,
    getMatkulbyId,
    getMatkulbyKode,
    getMatkulbyNama,
    createMatkul,
    deleteMatkulbyId,
} from "../services/matkul.service.js";

import { createMatkulValidation } from "../validations/matkul.validation.js";

export const getMatkulAllController = async (req, res) => {
    const matkuls = await getMatkulAll();
    if (!matkuls) {
        return res.status(404).json({ message: "No records available at the moment" });
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
    const {error, value} = createMatkulValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const uniqueNama = await getMatkulbyNama(value.nama);
    if (uniqueNama) {
        return res.status(404).json({ message: "Mata Kuliah already exists" });
    }
    
    const uniqueKode = await getMatkulbyKode(value.kode);
    if (uniqueKode) {
        return res.status(404).json({ message: "Kode Mata Kuliah already used" });
    }

    try {
        await createMatkul(value);
        res.status(200).json({ message: "Mata Kuliah created successfully "});
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};

export const deleteMatkulController = async (req, res) => {
    const id = req.params.id;
    const matkul = await getMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }

    try {
        await deleteMatkulbyId(id);
        return res.status(200).json({ message: "Matkul deleted successfully"});
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};