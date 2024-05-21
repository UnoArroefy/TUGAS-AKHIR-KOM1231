import prisma from "../db/index.js";

export const getNotificationById = async (id) => {
    const notification = await prisma.notification.findUnique({
        where: {
            id,
        }
    });
    return notification;
}

export const getNotificationUser = async (id) => {
    const notifications = await prisma.notification.findMany({
        where: {
            mahasiswaId: id
        }
    });
    return notifications;
}

export const pushNotification = async (data) => {
    const notification = await prisma.notification.create({
        data: {
            content: data.content,
            mahasiswa : {
                connect: {
                    id: data.mahasiswaId
                }
            }
        }
    });
    return notification;
}

export const deleteNotificationAll = async (id) => {
    const deleteNotification = await prisma.notification.deleteMany({
        where: {
            mahasiswaId: id
        }
    });
    return deleteNotification;
}

export const deleteNotification = async (id) => {
    const deleteNotification = await prisma.notification.delete({
        where: {
            id,
        }
    });
    return deleteNotification;
}