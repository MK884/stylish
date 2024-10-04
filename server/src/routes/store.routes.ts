import { Router } from "express";
import { verifyJwt } from "../middlewares";
import { getAllStore, getStoreById } from "../controllers";

const storeRoute = Router();

storeRoute.use(verifyJwt);
storeRoute.route('/').get(getAllStore);
storeRoute.route('/:id').get(getStoreById)

export { storeRoute };