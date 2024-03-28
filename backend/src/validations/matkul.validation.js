import joi from "joi";

export const createMatkulValidation = (data) => {
    const schema = joi.object({
        nama: joi.string()
            .trim()
            .required(),
        kode: joi.string()
            .trim()
            .regex(/^[A-Z]*\d*$/)
            .message('Invalid kode mata kuliah')
            .required(),
        sks: joi.number()
            .min(1)
            .max(6)
            .required(),
    });

    return schema.validate(data);
};