import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'hdgasuydyaw89dyash';

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BearerToken = req?.headers.authorization 
  
  const token = BearerToken?.split(' ')?.[1];

  if (!token){
    res.status(401).json({
      statusCode: 401,
      success: false,
      message: 'unauthorized',
    });
    return;

  } 
    

  try {
    const user = jwt.verify(token, accessTokenSecret) as UserToken;

    if (!user){
      res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'invalid access token',
      });
      return;
    } 
      

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(403).json({
        statusCode: 403,
        success: false,
        message: error.message,
        error
      });
    }
  }
};
