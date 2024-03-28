import joi from "joi";

export const createJadwalValidation = (data) => {
    const schema = joi.object({
        mahasiswaId: joi.string()
            .trim()
            .uuid()
            .required(),
        jadwalId: joi.string()
            .trim()
            .uuid()
            .required(),
    });

    return schema.validate(data);
}