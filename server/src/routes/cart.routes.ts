import { Router } from 'express';
import { verifyJwt } from '../middlewares';
import {
  addToCart,
  clearCart,
  getAllCartOfUser,
  getCartById,
  removeFromCart,
} from '../controllers';

const cartRouter = Router();

cartRouter.use(verifyJwt);
cartRouter.route('/').get(getAllCartOfUser);
cartRouter.route('/id/').get(getCartById);
cartRouter.route('/add').post(addToCart);
cartRouter.route('/remove/:productId').delete(removeFromCart);
cartRouter.route('/').delete(clearCart);

export { cartRouter };
