import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { CustomeRequest } from '../constant';
import { NextFunction, Response } from 'express';
import { ApiError } from '../utils';

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'hdgasuydyaw89dyash';

export const verifyJwt = (
  req: CustomeRequest,
  res: Response,
  next: NextFunction
) => {
  const BearerToken = req?.headers.authorization ?? req.cookies?.accessToken;

  // Check if there's a token and it's using the Bearer scheme
  if (!BearerToken || !BearerToken.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized request: No token provided');
  }

  const token = BearerToken.split(' ')?.[1];

  if (!token) throw new ApiError(401, 'Unauthorized request');

  try {
    const user = jwt.verify(token, accessTokenSecret) as UserToken;

    if (!user) throw new ApiError(403, 'Invalid Access Token');

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(403).json(new ApiError(403, 'Inavlid Token', error?.message));
    }
  }
};
