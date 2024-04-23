import joi from "joi";

export const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string()
            .trim()
            .required(),
        password: joi.string()
            .trim()
            .required(),
    });

    return schema.validate(data);
}