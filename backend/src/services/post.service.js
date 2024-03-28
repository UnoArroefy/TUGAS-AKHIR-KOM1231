import prisma from "../db/index.js";

export const getPostAll = async () => {
    const posts = await prisma.posts.findMany();
    return posts;
}

export const getPostofUser = async (id) => {
    const posts = await prisma.posts.findMany({
        where: {
            authorId: id
        }, include: {
            author: {
                select: {
                    name: true,
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
    return posts;
}

export const getPostbyMatkul = async (id) => {
    const posts = await prisma.posts.findMany({
        where: {
            jadwal: {
                matkulId: id,
            }
        }, include: {
            author: {
                select: {
                    name: true,
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
    return posts;
}

export const getPostbySearch = async (search) => {
    const posts = await prisma.posts.findMany({
        where: {
            title: {
                contains: search
            }
        }, include: {
            author: {
                select: {
                    name: true,
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
    return posts;
}

export const getPostbyId = async (id) => {
    const posts = await prisma.posts.findUnique({
        where: {
            id,
        }, include: {
            author: {
                select: {
                    name: true,
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
    return posts;
}

export const createPost = async (data) => {
    const posts = await prisma.posts.create({
        data: {
            title: data.title,
            jadwal: { connect: { id: data.jadwalId } },
            author: { connect: { id: data.authorId } },
        }
    });
    return posts;
}

export const offertoPost = async (id) => {
    const posts = await prisma.posts.update({
        where: {
            id,
        },
        data: {
            offer: { connect: { id: data.offerId } },
        }
    });
    return posts;
}
