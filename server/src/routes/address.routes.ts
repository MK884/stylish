import { Router } from 'express';
import { verifyJwt } from '../middlewares';
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers';

const addressRouter = Router();

addressRouter.use(verifyJwt);
addressRouter.route('/').get(getAddress);
addressRouter.route('/').post(addAddress);
addressRouter.route('/:addressId').patch(updateAddress);
addressRouter.route('/:addressId').delete(deleteAddress);

export { addressRouter };
