import Joi from "joi";

const NewProductSchema = Joi.object({
    product: Joi.string().required(),
    price: Joi.number().required() || Joi.string().required()
})

const newNameSchema = Joi.object({
    newName: Joi.string().required()
})

const newPriceSchema = Joi.object({
    newPrice: Joi.string().required()
})

export {
    NewProductSchema,
    newNameSchema,
    newPriceSchema
}