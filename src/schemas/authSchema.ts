import Joi from "joi";

const signUpSchema = Joi.object({
    picture: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.required(),
    confirmPassword: Joi.required()
})

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.required()
})

export {signUpSchema, signInSchema}