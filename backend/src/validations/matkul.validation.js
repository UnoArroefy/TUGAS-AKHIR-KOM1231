import joi from "joi";

export const createMatkulValidation = (data) => {
    const schema = joi.object({
        nama: joi.string().trim().required(),
        kode: joi.string().trim().required(),
        sks: joi.number().required(),
    });

    return schema.validate(data);
};