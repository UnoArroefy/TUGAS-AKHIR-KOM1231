import joi from "joi";

export const createJadwalValidation = (data) => {
    const schema = joi.object({
        mataKuliahId: joi.string().trim().required(),
        hari: joi.string().trim().required(),
        jam: joi.string().trim().required(),
        ruangan: joi.string().trim().required(),
    });

    return schema.validate(data);
}