import "dotenv/config";
import jwt from "jsonwebtoken";
import { valid_tokens } from "../controllers/auth.controller.js";

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        if (!valid_tokens.has(token)) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const checkAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role !== "Admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const checkRole = (req, res, next) => {
    const role = req.body.role;
    if (!role || role !== "Admin") {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role !== "Admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
