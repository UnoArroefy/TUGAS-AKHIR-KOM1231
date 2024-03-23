import {
    getJadwalMahasiswaAll
} from "../services/jadwalmahasiswa.service.js";

export const getJadwalMahasiswaAllController = async (req, res) => {
    const jadwal = await getJadwalMahasiswaAll();
    if (!jadwal.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(jadwal);
}