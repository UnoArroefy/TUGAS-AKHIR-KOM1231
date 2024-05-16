import joi from "joi";

export const createPostValidation = (data) => {
    const schema = joi.object({
        title: joi.string()
            .trim()
            .min(3)
            .max(100)
            .required(),
        jadwalId: joi.array()
            .items(joi.string().trim().uuid())
            .min(1)
            .required()
            .messages({
                'any.required': 'Jadwal is required',
                'array.min': 'Jadwal is required' // Custom error message for min validation
            }),
        authorId: joi.string()
            .trim()
            .uuid()
            .required(),
    });
    return schema.validate(data);
}