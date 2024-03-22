import prisma from "../db/index.js";

export const getJadwalAll = async () => {
    const jadwal = await prisma.jadwalMataKuliah.findMany({
        include: {
            mataKuliah: true
        }
    });
    return jadwal;
}

export const createJadwal = async (data) => {
    const jadwal = await prisma.jadwalMataKuliah.create({
        data: {
            mataKuliah: { connect: { id: data.mataKuliahId } },
            hari: data.hari,
            jam: data.jam,
            ruangan: data.ruangan,
        }
    });
    return jadwal;
}

export const getJadwalbyMatkulId = async (id) => {
    const jadwal = await prisma.jadwalMataKuliah.findMany({
        where: {
            mataKuliahId: id
        }, 
        include: {
            mataKuliah: true
        }
    });
    return jadwal;
}