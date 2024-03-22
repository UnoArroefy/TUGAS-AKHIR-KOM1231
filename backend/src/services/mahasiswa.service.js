const prisma = require("../db");

const getMahasiswaAll = async () => {
    const mahasiswa = await prisma.mahasiswa.findMany();
    return mahasiswa;
}

const getMahasiswabyId = async (id) => {
    const mahasiswa = await prisma.mahasiswa.findUnique({
        where: {
            id,
        }
    });
    return mahasiswa;
}

const createMahasiswa = async (data) => {
    const mahasiswa = await prisma.mahasiswa.create({
        data: {
            nama: data.nama,
            nim: data.nim,
            email: data.email,
            password: data.password,
        }
    });
    return mahasiswa
}

const deleteMahasiswa = async (id) => {
    const deleteMahasiswa = await prisma.mahasiswa.delete({
        where: {
            id,
        }
    });
    return deleteMahasiswa;
}

const updateMahasiswa = async (id, data) => {
    const mahasiswa = await prisma.mahasiswa.update({
        where: {
            id,
        },
        data: {
            nama: data.nama,
            nim: data.nim,
            email: data.email,
            password: data.password,
        }
    });
    return mahasiswa;
}

const updateMahsiswaPartial = async (id, data) => {
    const mahasiswa = await prisma.mahasiswa.update({
        where: {
            id,
        },
        data: {
            ...data,
        }
    });
    return mahasiswa;
}

module.exports = {
    getMahasiswaAll,
    getMahasiswabyId,
    createMahasiswa,
    deleteMahasiswa,
    updateMahasiswa,
    updateMahsiswaPartial,
}