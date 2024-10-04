import { Router } from "express";
import { verifyJwt } from "../middlewares";
import { addToCart, clearCart, getAllCartOfUser, removeFromCart } from "../controllers";

const cartRouter = Router();


cartRouter.use(verifyJwt);
cartRouter.route('/').get(getAllCartOfUser);
cartRouter.route('/add/:productId/:qty?').get(addToCart);
cartRouter.route('/remove/:productId').delete(removeFromCart);
cartRouter.route('/').delete(clearCart);


export { cartRouter}    