import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().trim().required().min(3),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }) 
    .required(),
    

  password: Joi.string().min(8).required(),

  role: Joi.array().items(Joi.string()).min(1).default(["menter"]),

  status: Joi.number().integer().default(0),
});

export default userValidationSchema;
