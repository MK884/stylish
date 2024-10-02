import { Router } from 'express';
import { loginUser, registerUser } from '../controllers';

export const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

