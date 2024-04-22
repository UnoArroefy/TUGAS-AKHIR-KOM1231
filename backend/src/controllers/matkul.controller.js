import {
    getMatkulAll,
    getMatkulbyId,
    createMatkul,
    deleteMatkulbyId,
} from "../services/matkul.service.js";

import {matkulFullValidation, matkulPartialValidation } from "../validations/matkul.validation.js";

export const getMatkulAllController = async (req, res) => {
    const matkuls = await getMatkulAll();
    if (!matkuls.length) {
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
    const {error, value} = matkulFullValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    try {
        await createMatkul(value);
        res.status(200).json({ message: "Mata Kuliah created successfully "});
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('kode')) {
                return res.status(404).json({ message: 'kode is already in use.' });
            } else if (error.meta.target.includes('nama')) {
                return res.status(404).json({ message: 'nama is already in use.' });
            }
        }
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
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

export const updateMatkulController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const matkul = await getMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }

    const {error, value} = matkulFullValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    try {
        await updateMatkul(id, value);
        return res.status(200).json({ message: "Matkul updated successfully"});
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('kode')) {
                return res.status(404).json({ message: 'kode is already in use.' });
            } else if (error.meta.target.includes('nama')) {
                return res.status(404).json({ message: 'nama is already in use.' });
            }
        }
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
}

export const updateMatkulPartialController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const matkul = await getMatkulbyId(id);
    if (!matkul) {
        return res.status(404).json({ message: "Matkul not found" });
    }

    const {error, value} = matkulPartialValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    try {
        await updateMatkul(id, value);
        return res.status(200).json({ message: "Matkul updated successfully"});
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('kode')) {
                return res.status(404).json({ message: 'kode is already in use.' });
            } else if (error.meta.target.includes('nama')) {
                return res.status(404).json({ message: 'nama is already in use.' });
            }
        }
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
}