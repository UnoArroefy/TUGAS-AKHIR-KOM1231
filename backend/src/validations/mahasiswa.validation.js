import joi from "joi";

export const createMahasiswaValidation = (data) => {
    const schema = joi.object({
        nama: joi.string()
            .trim()
            .required(),
        nim: joi.string()
            .trim()
            .length(11)
            .regex(/^[A-Z]\d{10}$/)
            .message('Invalid NIM format')
            .required(),
        email: joi.string()
            .trim()
            .regex(/^[^\s@]+@apps\.ipb\.ac\.id$/)
            .message('Invalid email address')
            .required(),
        password: joi.string()
            .trim()
            .min(8)
            .message('Password must be at least 8 characters long')
            .required(),
        role: joi.string()
            .trim()
            .valid('Admin', 'User')
            .options({ messages: { 'any.only': 'Invalid role' } })
    });

    return schema.validate(data);
}