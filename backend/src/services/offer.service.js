import prisma from "../db/index.js";

export const getOfferAll = async () => {
    const offer = await prisma.offer.findMany();
    return offer;
}

export const getOfferofPost = async (id) => {
    const offer = await prisma.offer.findMany({
        where: {
            postId: id
        }
    });
    return offer;
}

export const getOfferbyId = async (id) => {
    const offer = await prisma.offer.findUnique({
        where: {
            id,
        }
    });
    return offer;
}

export const createOffer = async (data) => {
    const offer = await prisma.offer.create({
        data,
        post: { connect: { id: data.postId } }
    });
    return offer;
}

export const deleteOffer = async (id) => {
    const deleteOffer = await prisma.offer.delete({
        where: {
            id,
        }
    });
    return deleteOffer;
}

export const deleteAllOfferofPost = async (id) => {
    const deleteOffer = await prisma.offer.deleteMany({
        where: {
            postId: id,
        }
    });
    return deleteOffer;
}