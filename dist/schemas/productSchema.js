import Joi from "joi";
var NewProductSchema = Joi.object({
    product: Joi.string().required(),
    price: Joi.number().required() || Joi.string().required()
});
var newNameSchema = Joi.object({
    newName: Joi.string().required()
});
var newPriceSchema = Joi.object({
    newPrice: Joi.string().required()
});
export { NewProductSchema, newNameSchema, newPriceSchema };
