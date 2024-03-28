import prisma from "../db/index.js";

export const getJadwalMahasiswaAll = async () => {
    const jadwal = await prisma.jadwalMahasiswa.findMany();
    return jadwal;
}

export const getJadwalMahasiswaById = async (id) => {
    const jadwal = await prisma.jadwalMahasiswa.findUnique({
        where: {
            id,
        }
    });
    return jadwal;
}

export const getJadwalMahasiswa = async (id) => {
    const jadwal = await prisma.jadwalMahasiswa.findMany({
        where: {
            mahasiswaId: id
        },
        include: {
            mahasiswa: {
                select: {
                    nama: true,
                    nim: true
                }
            },
            jadwal: {
                select: {
                    hari: true,
                    jam: true,
                    ruangan: true,
                    mataKuliah: {
                        select: {
                            nama: true
                        }
                    }
                }
            }
        }
    });
    return jadwal;
}

export const createJadwalMahasiswa = async (data) => {
    const jadwal = await prisma.jadwalMahasiswa.create({
        data: {
            mahasiswa: { connect: { id: data.mahasiswaId } },
            jadwal: { connect: { id: data.jadwalId } }
        }
    });
    return jadwal;
}

export const deleteJadwalMahasiswa = async (id) => {
    const deleteJadwal = await prisma.jadwalMahasiswa.delete({
        where: {
            id,
        }
    });
    return deleteJadwal;
}