import prisma from "../db/index.js";

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