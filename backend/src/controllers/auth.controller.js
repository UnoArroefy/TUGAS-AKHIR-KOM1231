import "dotenv/config"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginValidation } from "../validations/auth.validation.js";
import { getMahasiswabyEmail } from "../services/mahasiswa.service.js";

export const valid_tokens = new Set();

export const loginController = async (req, res, next) => {
    const data = req.body;
    const {error, value} = loginValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const mahasiswa = await getMahasiswabyEmail(value);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Invalid email address" });
    }

    const validPassword = await bcrypt.compare(value.password, mahasiswa.password);
    if (!validPassword) {
        return res.status(404).json({ message: "Invalid password" });
    }

    const token = await jwt.sign({ id: mahasiswa.id, role: mahasiswa.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    valid_tokens.add(token);
    res.status(200).json({ accessToken: token });
}

export const logoutController = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    valid_tokens.delete(token);
    res.status(200).json({ message: "Logged out successfully" });
}