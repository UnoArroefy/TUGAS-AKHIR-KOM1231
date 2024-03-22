const prisma = require("../db");

const getJadwalAll = async () => {
    const jadwal = await prisma.jadwalMataKuliah.findMany({
        include: {
            mataKuliah: true
        }
    });
    return jadwal;
}

const createJadwal = async (data) => {
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

const getJadwalbyMatkulId = async (id) => {
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

module.exports = {
    getJadwalAll,
    createJadwal,
    getJadwalbyMatkulId
}