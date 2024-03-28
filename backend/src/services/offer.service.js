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

