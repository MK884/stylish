import { Router } from 'express';
import { verifyJwt } from '../middlewares';
import { getAllProducts, getProductById } from '../controllers';

const productRouter = Router();

productRouter.use(verifyJwt);
productRouter.route('/').get(getAllProducts);
productRouter.route('/:id').get(getProductById);

export { productRouter };
