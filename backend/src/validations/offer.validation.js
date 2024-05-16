import joi from "joi";

export const createOfferValidation = (data) => {
    const schema = joi.object({
        postId : joi.string()
            .trim()
            .uuid()
            .required(),
        jadwalId: joi.array()
            .items(joi.string().trim().uuid())
            .min(1)
            .required()
            .messages({
                'any.required': 'Jadwal is required',
                'array.min': 'Jadwal is required' // Custom error message for min validation
            }),
        mahasiswaId : joi.string()
            .trim()
            .uuid()
            .required()
    });

    return schema.validate(data);
}