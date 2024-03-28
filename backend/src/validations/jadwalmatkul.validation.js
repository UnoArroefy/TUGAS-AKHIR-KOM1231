import joi from "joi";

export const createJadwalValidation = (data) => {
    const schema = joi.object({
        mataKuliahId: joi.string()
            .trim()
            .uuid()
            .required(),
        hari: joi.string()
            .trim()
            .valid('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')
            .options({ messages: { 'any.only': 'Invalid day' } })
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