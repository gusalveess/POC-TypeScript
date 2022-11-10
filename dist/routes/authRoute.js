import { Router } from "express";
import { schemaValidationMiddleware } from '../middlewares/ValidationMiddlewares.js';
import { SU, SI, LogOut } from "../controllers/authControllers.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
var authRouter = Router();
authRouter.post("/signUp", schemaValidationMiddleware(signUpSchema), SU);
authRouter.post("/signIn", schemaValidationMiddleware(signInSchema), SI);
authRouter.post("/logOut", LogOut);
export default authRouter;
