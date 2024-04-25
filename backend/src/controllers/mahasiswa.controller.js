import {
    getMahasiswaAll,
    getMahasiswabyId,
    createMahasiswa,
    deleteMahasiswa,
    updateMahasiswa
} from "../services/mahasiswa.service.js";
import { mahasiswaPartialValidation, mahasiswaFullValidation } from "../validations/mahasiswa.validation.js";
import bcrypt from "bcrypt";

export const getMahasiswaAllController = async (req, res) => {
    const mahasiswa = await getMahasiswaAll();
    if (!mahasiswa.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(mahasiswa);
}

export const getMahasiswabyIdController = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    if (user.role !== "Admin" && user.id !== id) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }
    return res.status(200).json(mahasiswa);
}

export const createMahasiswaController = async (req, res) => {
    const data = req.body;
    const {error, value} = mahasiswaFullValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }
    value.password = await bcrypt.hash(value.password, 10);
    try {
        await createMahasiswa(value);
        res.status(200).json({ message : "Mahasiswa created successfully "});
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('nim')) {
                return res.status(404).json({ message: 'NIM is already in use.' });
            } else if (error.meta.target.includes('email')) {
                return res.status(404).json({ message: 'Email is already in use.' });
            }
        }

        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};

export const deleteMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    if (user.role !== "Admin" && user.id !== id) {
        return res.status(403).json({ message: "Forbidden" });
    }

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

export const updateMahasiswaController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const {error, value} = mahasiswaFullValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const user = req.user;
    if (user.role !== "Admin" && user.id !== id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    try {
        await updateMahasiswa(id, {
            nama: value.nama,
            nim: value.nim,
            email: value.email,
            password: await bcrypt.hash(value.newPassword, 10),
            role: value.role
        });
        return res.status(200).json({ message: "Mahasiswa updated successfully" });
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('nim')) {
                return res.status(404).json({ message: 'NIM is already in use.' });
            } else if (error.meta.target.includes('email')) {
                return res.status(404).json({ message: 'Email is already in use.' });
            }
        }

        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};

export const updateMahasiswaPartialController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const {error, value} = mahasiswaPartialValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const user = req.user;
    if (user.role !== "Admin" && user.id !== id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const mahasiswa = await getMahasiswabyId(id);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    if (value.password) {
        value.password = await bcrypt.hash(value.password, 10);
    }

    try {
        await updateMahasiswa(id, value);
        return res.status(200).json({ message: "Mahasiswa updated successfully" });
    } catch (error) {
        if (error.code === 'P2002') {
            if (error.meta.target.includes('nim')) {
                return res.status(404).json({ message: 'NIM is already in use.' });
            } else if (error.meta.target.includes('email')) {
                return res.status(404).json({ message: 'Email is already in use.' });
            }
        }

        return res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
}
