import Joi from "joi";

export const categoryValidator = Joi.object({
    name: Joi.string().required().min(3).lowercase(),
    status: Joi.number().required(),
})