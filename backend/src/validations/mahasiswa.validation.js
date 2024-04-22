import joi from "joi";

export const mahasiswaFullValidation = (data) => {
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

export const mahasiswaPartialValidation = (data) => {
    const schema = joi.object({
        nama: joi.string()
            .trim(),
        nim: joi.string()
            .trim()
            .length(11)
            .regex(/^[A-Z]\d{10}$/)
            .message('Invalid NIM format'),
        email: joi.string()
            .trim()
            .regex(/^[^\s@]+@apps\.ipb\.ac\.id$/)
            .message('Invalid email address'),
        password: joi.string()
            .trim()
            .min(8)
            .message('Password must be at least 8 characters long'),
        role: joi.string()
            .trim()
            .valid('Admin', 'User')
            .options({ messages: { 'any.only': 'Invalid role' } })
    })
    .or('email', 'role', 'nama', 'nim', 'password');

    return schema.validate(data);
}