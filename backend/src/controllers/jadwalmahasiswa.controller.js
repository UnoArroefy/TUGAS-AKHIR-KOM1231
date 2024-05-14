import {
    getJadwalMahasiswaAll,
    getJadwalMahasiswa,
    getJadwalMahasiswaById,
    createJadwalMahasiswa,
    deleteJadwalMahasiswa,
    checkJadwalMahasiswa
} from "../services/jadwalmahasiswa.service.js";

import { createJadwalValidation } from "../validations/jadwalmahasiswa.validation.js";
import { getMahasiswabyId } from "../services/mahasiswa.service.js";
import { getJadwalbyId } from "../services/jadwalmatkul.service.js";
import { deletemanyPost } from "../services/post.service.js";

export const getJadwalMahasiswaAllController = async (req, res) => {
    const jadwal = await getJadwalMahasiswaAll();
    if (!jadwal.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(jadwal);
}

export const getJadwalMahasiswaController = async (req, res) => {
    const id = req.params.id;

    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    const jadwal = await getJadwalMahasiswa(id);
    if (!jadwal.length) {
        return res.status(404).json({ message: "Jadwal not found" });
    }
    return res.status(200).json(jadwal);
}

export const getJadwalMahasiswabyIdController = async (req, res) => {
    const id = req.params.id;
    const jadwal = await getJadwalMahasiswaById(id);
    if (!jadwal) {
        return res.status(404).json({ message: "Jadwal not found" });
    }
    return res.status(200).json(jadwal);
}

export const createJadwalMahasiswaController = async (req, res) => {
    const data = req.body;
    const {error, value} = createJadwalValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const user = req.user;
    if (user.role !== "Admin" && user.id !== value.mahasiswaId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const mahasiswa = await getMahasiswabyId(value.mahasiswaId);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    const jadwal = await getJadwalbyId(value.jadwalId);
    if (!jadwal) {
        return res.status(404).json({ message: "Jadwal not found" });
    }

    const check = await checkJadwalMahasiswa(value.mahasiswaId, value.jadwalId);
    if (check) {
        return res.status(404).json({ message: "Jadwal already exists" });
    }

    const jadwalMahasiswa = await getJadwalMahasiswa(value.mahasiswaId);

    if (jadwalMahasiswa.length) {
        for (let item of jadwalMahasiswa)
        {
            if (item.jadwal.hari === jadwal.hari) {
                if (item.jadwal.jam === jadwal.jam) {
                    return res.status(404).json({ message: "Jadwal already exists" });
                }
            }

            if (item.jadwal.mataKuliah.id === jadwal.mataKuliahId) {
                return res.status(404).json({ message: "Jadwal already exists" });
            }
        }
    }

    try {
        await createJadwalMahasiswa(value);
        res.status(200).json({ message : "Jadwal created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

export const deleteJadwalMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const jadwal = await getJadwalMahasiswaById(id);
    if (!jadwal) {
        return res.status(404).json({ message: "Jadwal not found" });
    }

    const user = req.user;
    if (user.role !== "Admin" && user.id !== jadwal.mahasiswaId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await deletemanyPost(id);
        await deleteJadwalMahasiswa(id);
        res.status(200).json({ message : "Jadwal deleted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}