import { Router } from "express";
import { verifyJwt } from "../middlewares";
import { getAllCategories } from "../controllers";

const categoryRoute = Router();

categoryRoute.use(verifyJwt);
categoryRoute.route('/category').get(getAllCategories);

export { categoryRoute }