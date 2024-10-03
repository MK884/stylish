import { Router } from 'express';
import {
  deleteUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  updateUser,
} from '../controllers';
import { upload, verifyJwt } from '../middlewares';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/refresh').post(refreshUserToken);

// protected routes
userRouter.use(verifyJwt);
userRouter.route('/logout').get(logoutUser);
userRouter.route('/update').patch(upload.single('avatar'), updateUser);
userRouter.route('/delete').delete(deleteUser);

export { userRouter };
