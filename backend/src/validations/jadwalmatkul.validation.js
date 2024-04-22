import joi from "joi";

export const jadwalFullValidation = (data) => {
    const schema = joi.object({
        mataKuliahId: joi.string()
            .trim()
            .uuid()
            .required(),
        hari: joi.string()
            .trim()
            .valid('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')
            .options({ messages: { 'any.only': 'Invalid day (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu)' } })
            .required(),
        jam: joi.string()
            .trim()
            .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .required(),
        ruangan: joi.string()
            .trim()
            .required(),
    });

    return schema.validate(data);
}

export const jadwalPartialValidation = (data) => {
    const schema = joi.object({
        mataKuliahId: joi.string()
            .trim()
            .uuid(),
        hari: joi.string()
            .trim()
            .valid('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')
            .options({ messages: { 'any.only': 'Invalid day (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu)' } }),
        jam: joi.string()
            .trim()
            .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        ruangan: joi.string()
            .trim(),
    })
    .or('mataKuliahId', 'hari', 'jam', 'ruangan');

    return schema.validate(data);
}