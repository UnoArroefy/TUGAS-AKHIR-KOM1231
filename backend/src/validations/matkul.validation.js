import joi from "joi";

export const matkulFullValidation = (data) => {
    const schema = joi.object({
        nama: joi.string()
            .trim()
            .required(),
        kode: joi.string()
            .trim()
            .regex(/^[A-Z]*\d*[A-Z]?$/)
            .message('Invalid kode mata kuliah')
            .max(7)
            .required(),
        sks: joi.number()
            .min(1)
            .max(6)
            .required(),
    });

    return schema.validate(data);
};

export const matkulPartialValidation = (data) => {
    const schema = joi.object({
        nama: joi.string()
            .trim(),
        kode: joi.string()
            .trim()
            .regex(/^[A-Z]*\d*[A-Z]?$/)
            .message('Invalid kode mata kuliah')
            .max(7),
        sks: joi.number()
            .min(1)
            .max(6),
    })
    .or('nama', 'kode', 'sks');

    return schema.validate(data);
}