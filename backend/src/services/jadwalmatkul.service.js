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

export const getJadwalbyId = async (id) => {
    const jadwal = await prisma.jadwalMataKuliah.findUnique({
        where: {
            id,
        }
    });
    return jadwal;
}

export const deleteJadwal = async (id) => {
    const deleteJadwal = await prisma.jadwalMataKuliah.delete({
        where: {
            id,
        }
    });
    return deleteJadwal;
}
