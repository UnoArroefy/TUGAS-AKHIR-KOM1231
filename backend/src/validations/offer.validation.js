import joi from "joi";

export const createOfferValidation = (data) => {
    const schema = joi.object({
        postId : joi.string()
            .trim()
            .uuid()
            .required(),
        jadwalId: joi.array()
            .items(joi.string().trim().uuid())
            .required(),
        mahasiswaId : joi.string()
            .trim()
            .uuid()
            .required()
    });

    return schema.validate(data);
}