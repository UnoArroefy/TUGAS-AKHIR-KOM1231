const prisma = require("../db");

const getMatkulAll = async () => {
    const mataKuliah = await prisma.mataKuliah.findMany();
    return mataKuliah;
};

const getMatkulbyId = async (id) => {
    const mataKuliah = await prisma.mataKuliah.findUnique({
        where: {
            id,
        }
    });
    return mataKuliah;
}

const createMatkul = async (data) => {
    const mataKuliah = await prisma.mataKuliah.create({
        data: {
            nama: data.nama,
            kode: data.kode,
            sks: data.sks,
        }
    });
    return mataKuliah
}

const deleteMatkulbyId = async (id) => {
    const deleteMatkul = await prisma.mataKuliah.delete({
        where: {
            id,
        }
    });
    return deleteMatkul;
}

const updateMatkul = async (id, data) => {
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

const updateMatkulPartial = async (id, data) => {
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

module.exports ={
    getMatkulAll,
    getMatkulbyId,
    createMatkul,
    deleteMatkulbyId,
    updateMatkul,
    updateMatkulPartial
}