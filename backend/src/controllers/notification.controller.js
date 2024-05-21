import { deleteNotification, deleteNotificationAll, getNotificationById, getNotificationUser } from "../services/notification.service.js";

export const getNotificationUserController = async (req, res) => {
    const id = req.params.id;
    const notifications = await getNotificationUser(id);
    if (!notifications.length) {
        return res.status(404).json({ message: "No Notification Found" });
    }
    return res.status(200).json(notifications);
}

export const deleteNotificationController = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    
    const notification = await getNotificationById(id);
    if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
    }
    
    if (user.role !== "Admin" && user.id !== notification.mahasiswaId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await deleteNotification(id);
        res.status(200).json({ message : "Notification deleted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

export const deleteNotificationAllController = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    
    const notification = await getNotificationUser(id);
    if (!notification.length) {
        return res.status(404).json({ message: "Notification not found" });
    }

    if (user.role !== "Admin" && user.id !== notification[0].mahasiswaId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await deleteNotificationAll(id);
        res.status(200).json({ message : "Notification Cleared"});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}
