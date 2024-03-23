import { 
    getJadwalAll, 
    createJadwal, 
    getJadwalbyMatkulId,
    getJadwalbyId, 
    deleteJadwal 
} from "../services/jadwalmatkul.service.js";

import { createJadwalValidation } from "../validations/jadwalmatkul.validation.js";
import { getMatkulbyId } from "../services/matkul.service.js";

export const getJadwalAllController = async (req, res) => {
    const jadwal = await getJadwalAll();
    if (!jadwal.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(jadwal);
}

export const createJadwalController = async (req, res) => {
    const data = req.body;

    const {error, value} = createJadwalValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const matkul = await getMatkulbyId(value.mataKuliahId);
    if (!matkul) {
        return res.status(404).json({ message: "Mata Kuliah not found" });
    }

    try {
        await createJadwal(value);
        res.status(200).json({ message : "Jadwal created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

export const getJadwalbyMatkulIdController = async (req, res) => {
    const id = req.params.id;

    const matkul = await getMatkulbyId(data.mataKuliahId);
    if (!matkul) {
        return res.status(404).json({ message: "Mata Kuliah not found" });
    }

    const jadwal = await getJadwalbyMatkulId(id);
    if (!jadwal.length) {
        return res.status(404).json({ message: "Jadwal not found" });
    }
    return res.status(200).json(jadwal);
}

export const deleteJadwalController = async (req, res) => {
    const id = req.params.id;
    const jadwal = await getJadwalbyId(id);
    if (!jadwal) {
        return res.status(404).json({ message: "Jadwal not found" });
    }

    try {
        await deleteJadwal(id);
        return res.status(200).json({ message: "Jadwal deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
}