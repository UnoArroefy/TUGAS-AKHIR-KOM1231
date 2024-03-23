import prisma from "../db/index.js";

export const getJadwalMahasiswaAll = async () => {
    const jadwal = await prisma.jadwalMahasiswa.findMany();
    return jadwal;
}

export const getJadwalMahasiswa = async (id) => {
    const jadwal = await prisma.jadwalMahasiswa.findUnique({
        where: {
            id,
        }
    });
    return jadwal;
}