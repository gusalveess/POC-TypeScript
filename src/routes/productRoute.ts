import { Router } from "express";
import { schemaValidationMiddleware } from "../middlewares/ValidationMiddlewares.js";
import { NewProductSchema, newNameSchema, newPriceSchema } from "../schemas/productSchema.js";
import { InsertProduct, GetProducts, GetTotal, EditProduct, EditPrice, Del } from "../controllers/productControllers.js";

const productRoute = Router();

productRoute.post("/newProduct", schemaValidationMiddleware(NewProductSchema), InsertProduct);
productRoute.get("/myProducts", GetProducts);
productRoute.get("/myTotal", GetTotal);
productRoute.put("/editName:id", schemaValidationMiddleware(newNameSchema), EditProduct);
productRoute.put("/editPrice:id", schemaValidationMiddleware(newPriceSchema), EditPrice);
productRoute.delete("/delete:id", Del)

export default productRoute