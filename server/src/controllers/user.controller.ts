import { Request, Response } from 'express';
import { z } from 'zod';


const registerUserschema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

const registerUser = async (req: Request, res: Response) => {};
const loginUser = async (req: Request, res: Response) => {};
const logoutUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};
const updateUser = async (req: Request, res: Response) => {};
const updateUserAvatar = async (req: Request, res: Response) => {};
const refreshUserToken = async (req: Request, res: Response) => {};

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  updateUserAvatar,
  refreshUserToken,
};
