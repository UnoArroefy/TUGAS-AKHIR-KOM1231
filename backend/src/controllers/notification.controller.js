import { getNotificationUser } from "../services/notification.service.js";

export const getNotificationUserController = async (req, res) => {
    const id = req.params.id;
    const notifications = await getNotificationUser(id);
    if (!notifications.length) {
        return res.status(404).json({ message: "No Notification Found" });
    }
    return res.status(200).json(notifications);
}