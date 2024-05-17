import prisma from "../db/index.js";

export const getOfferAll = async () => {
    const offer = await prisma.offer.findMany({
        include: {
            mahasiswa: {
                select: {
                    nama: true,
                    nim: true
                }
            },
            post: {
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
                                            nama: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            jadwal: {
                select: {
                    id: true,
                    mahasiswa: {
                        select: {
                            id: true,
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
            }
        }            
    });
    return offer;
}

export const getOfferofPost = async (id) => {
    const offer = await prisma.offer.findMany({
        where: {
            postId: id
        }, include: {
            mahasiswa: {
                select: {
                    nama: true,
                    nim: true
                }
            },
            post: {
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
                                            nama: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            jadwal: {
                select: {
                    id: true,
                    mahasiswa: {
                        select: {
                            id: true,
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
            }
        }            
    });
    return offer;
}

export const getOfferbyId = async (id) => {
    const offer = await prisma.offer.findUnique({
        where: {
            id,
        }, include: {
            mahasiswa: {
                select: {
                    nama: true,
                    nim: true
                }
            },
            post: {
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
                                            nama: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            jadwal: {
                select: {
                    id: true,
                    mahasiswa: {
                        select: {
                            id: true,
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
            }
        }            
    });
    return offer;
}

export const getOfferOfUser = async (id) => {
    const offer = await prisma.offer.findMany({
        where: {
            mahasiswaId: id,
        }, include: {
            mahasiswa: {
                select: {
                    nama: true,
                    nim: true
                }
            },
            post: {
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
                                            nama: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            jadwal: {
                select: {
                    id: true,
                    mahasiswa: {
                        select: {
                            id: true,
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
            }
        }            
    });
    return offer;
}

export const checkOffer = async (mahasiswaId, postId) => {
    const offer = await prisma.offer.findFirst({
        where: {
            mahasiswaId,
            postId
        }
    });
    return offer;
}

export const createOffer = async (data) => {
    const offer = await prisma.offer.create({
        data: {
            mahasiswaId: data.mahasiswaId,
            postId: data.postId,
            jadwal: {
                connect: data.jadwalId.map(id => ({ id }))
            },
        },
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