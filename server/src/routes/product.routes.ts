import { Router } from 'express';
import { verifyJwt } from '../middlewares';
import { getAllProducts, getProductById, getProductsByStoreId } from '../controllers';

const productRouter = Router();

productRouter.use(verifyJwt);
productRouter.route('/').get(getAllProducts);
productRouter.route('/:id').get(getProductById);
productRouter.route('/store/:id').get(getProductsByStoreId);

export { productRouter };
