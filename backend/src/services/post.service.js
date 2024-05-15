import prisma from "../db/index.js";

export const getPostAll = async () => {
    const posts = await prisma.posts.findMany(
        {
            include: {
                jadwal: {
                    select: {
                        id: true,
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
                                        nama: true,
                                        kode: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    );
    return posts;
}

export const getPostofUser = async (id) => {
    const posts = await prisma.posts.findMany({
        where: {
            authorId: id
        }, include: {
            author: {
                select: {
                    nama: true,
                }
            },
            jadwal: {
                select: {
                    id: true,
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
                                    nama: true,
                                    kode: true
                                }
                            }
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
                    nama: true,
                }
            },
            jadwal: {
                select: {
                    id: true,
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
                                    nama: true,
                                    kode: true
                                }
                            }
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
                    nama: true,
                }
            },
            jadwal: {
                select: {
                    id: true,
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
                                    nama: true,
                                    kode: true
                                }
                            }
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
                    nama: true,
                }
            },
            jadwal: {
                select: {
                    id: true,
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
                                    nama: true,
                                    kode: true
                                }
                            }
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
            jadwal: {
                connect: data.jadwalId.map(id => ({ id }))
            },
            author: { connect: { id: data.authorId } },
        }
    });
    return posts;
}

export const deletePost = async (id) => {
    const deletePost = await prisma.posts.delete({
        where: {
            id,
        }
    });
    return deletePost;
}

export const deletemanyPost = async (id) => {
    const deletePost = await prisma.posts.deleteMany({
        where: {
            OR: [
                {
                    jadwal: {
                        some: {
                            id: id
                        }
                    }
                },
                {
                    jadwal: {
                        some: {
                            jadwalId: id
                        }
                    }
                }
            ]
        }
    });
    return deletePost;
};
