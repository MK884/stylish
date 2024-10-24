import { Router } from 'express';
import { verifyJwt } from '../middlewares';
import {
  cancelOrder,
  getOrderById,
  getOrdersOfUser,
  placeOrder,
} from '../controllers';

const orderRouter = Router();

orderRouter.use(verifyJwt);

orderRouter.route('/').get(getOrdersOfUser);
orderRouter.route('/:id').get(getOrderById);
orderRouter.route('/').post(placeOrder);
orderRouter.route('/:id').delete(cancelOrder);

export { orderRouter };
