import prisma from "../db/index.js";

export const getMahasiswaAll = async () => {
    const mahasiswa = await prisma.mahasiswa.findMany();
    return mahasiswa;
}

export const getMahasiswabyId = async (id) => {
    const mahasiswa = await prisma.mahasiswa.findUnique({
        where: {
            id,
        }
    });
    return mahasiswa;
}

export const createMahasiswa = async (data) => {
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

export const deleteMahasiswa = async (id) => {
    const deleteMahasiswa = await prisma.mahasiswa.delete({
        where: {
            id,
        }
    });
    return deleteMahasiswa;
}

export const updateMahasiswa = async (id, data) => {
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

export const updateMahsiswaPartial = async (id, data) => {
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