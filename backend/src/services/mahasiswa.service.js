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

module.exports = {
    getMahasiswaAll,
    getMahasiswabyId,
    createMahasiswa,
    deleteMahasiswa
}