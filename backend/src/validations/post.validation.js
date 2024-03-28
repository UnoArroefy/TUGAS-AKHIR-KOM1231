import joi from "joi";

export const createPostValidation = (data) => {
    const schema = joi.object({
        title: joi.string()
            .trim()
            .required(),
        jadwalId: joi.string()
            .trim()
            .uuid()
            .required(),
        authorId: joi.string()
            .trim()
            .uuid()
            .required(),
    });
    return schema.validate(data);
}