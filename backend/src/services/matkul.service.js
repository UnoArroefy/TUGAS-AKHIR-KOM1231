import prisma from "../db/index.js";

export const getMatkulAll = async () => {
    const mataKuliah = await prisma.mataKuliah.findMany();
    return mataKuliah;
};

export const getMatkulbyId = async (id) => {
    const mataKuliah = await prisma.mataKuliah.findUnique({
        where: {
            id,
        }
    });
    return mataKuliah;
}

export const createMatkul = async (data) => {
    const mataKuliah = await prisma.mataKuliah.create({
        data: {
            nama: data.nama,
            kode: data.kode,
            sks: data.sks,
        }
    });
    return mataKuliah
}

export const deleteMatkulbyId = async (id) => {
    const deleteMatkul = await prisma.mataKuliah.delete({
        where: {
            id,
        }
    });
    return deleteMatkul;
}

export const updateMatkul = async (id, data) => {
    const mataKuliah = await prisma.mataKuliah.update({
        where: {
            id,
        },
        data: {
            nama: data.nama,
            kode: data.kode,
            sks: data.sks,
        }
    });
    return mataKuliah;
}

export const updateMatkulPartial = async (id, data) => {
    const mataKuliah = await prisma.mataKuliah.update({
        where: {
            id,
        },
        data: {
            ...data,
        }
    });
    return mataKuliah;
}