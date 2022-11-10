import { Router } from "express";
import authRouter from "./authRoute.js";
import productRoute from "./productRoute.js";
var router = Router();
router.use(authRouter);
router.use(productRoute);
export default router;
