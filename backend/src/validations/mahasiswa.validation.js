import joi from "joi";

export const createMahasiswaValidation = (data) => {
    const schema = joi.object({
        nama: joi.string().trim().required(),
        nim: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
        role: joi.string().trim(),
    });

    return schema.validate(data);
}