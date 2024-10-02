import { CookieOptions, Request } from 'express';

export const DB_NAME = 'stylish';

export const saltOrRounds = 10;

export const cookieOpt: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export interface CustomeRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
  user?: UserToken;
}
