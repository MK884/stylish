import { Request, Response } from 'express';
import { z } from 'zod';
import {
  ApiError,
  ApiResponse,
  deleteSingleAsset,
  uploadOnCloudinary,
} from '../utils';
import { User } from '../models';
import { cookieOpt } from '../constant';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const registerUserschema = z.object({
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'jas91nbs5d41@##$nbda';

const registerUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const userInput = registerUserschema.safeParse(req?.body);

  if (!userInput?.success) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: 'validation failed',
      error: userInput?.error?.issues?.map((issue) => ({
        path: issue?.path,
        message: issue?.message,
      })),
    });
    return;
  }

  const { email, password, userName: userN } = userInput?.data;

  // check if user is already registered by username

  const userName = `@${userN}`.toLowerCase();

  try {
    const isExist = await User.findOne({ userName });

    if (isExist) {
      res.status(406).json({
        statusCode: 406,
        success: false,
        message: 'username already taken',
      });
      return;
    }

    const user = await User.create({ userName, email, password });

    const userData: Partial<IUser> = {
      userName: user.userName,
      email: user.email,
    };

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'user created successfully',
      data: userData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const loginUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const userInput = loginUserSchema.safeParse(req?.body);

  if (!userInput?.success) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: 'validation failed',
      error: userInput?.error?.issues?.map((issue) => ({
        path: issue?.path,
        message: issue?.message,
      })),
    });
    return;
  }
  const { email, password } = userInput?.data;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'user not found',
      });
      return;
    }

    const isPasswordCorrect = await user?.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'incorrect user credentials',
      });
      return;
    }

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'somthing went wrong while generating tokens',
      });
      return;
    }

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    const userData = {
      email: user?.email,
      phone: user?.phone,
      avatarUrl: user?.avatarUrl,
      publicName: user?.publicName,
      userName: user?.userName,
      refreshToken,
      accessToken,
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOpt)
      .cookie('refreshToken', refreshToken, cookieOpt)
      .json({
        statusCode: 200,
        success: true,
        message: 'login successful',
        data: userData,
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const logoutUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const userId = req?.user?._id;

  try {
    await User.findByIdAndUpdate(userId, {
      $unset: {
        refreshToken: 1,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }

  res
    .status(200)
    .clearCookie('accessToken', cookieOpt)
    .clearCookie('refreshToken', cookieOpt)
    .json({
      statusCode: 202,
      success: true,
      message: 'logged out successfully',
    });
};

const updateUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const { email, publicName, phone } = req?.body;

  const avatar = req?.file?.path;

  const isEmpty = !(email || publicName || phone || avatar);

  if (isEmpty) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: 'at least one field must be provided',
    });
    return;
  }

  const userInput: Partial<IUser> = {};

  if (email) userInput.email = email;
  if (publicName) userInput.publicName = publicName;
  if (phone) userInput.phone = phone;

  try {
    if (avatar) {
      const cloudResponse = await uploadOnCloudinary(avatar);
      if (!cloudResponse?.url) {
        res.status(500).json({
          statusCode: 500,
          success: false,
          message: 'failed to upload avatar',
        });
        return;
      }

      userInput.avatarUrl = cloudResponse?.url;
    }

    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
        $set: userInput,
      },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'user not found',
      });
      return;
    }

    const userData = {
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      publicName: user.publicName,
      userName: user.userName,
    };

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'user updated successfully',
      data: userData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const deleteUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const userId = req?.user?._id;

  try {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, 'No User to delete');

    const deletedUser = await User.findByIdAndDelete(user?._id);

    if (deletedUser === null) throw new ApiError(500, 'DB Error');

    if (deletedUser?.avatarUrl) {
      await deleteSingleAsset(deletedUser?.avatarUrl);
    }

    res
      .status(202)
      .clearCookie('accessToken', cookieOpt)
      .clearCookie('refreshToken', cookieOpt)
      .json({
        statusCode: 202,
        success: true,
        message: 'user deleted successfully',
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const refreshUserToken = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const token = req?.body?.refreshToken || req?.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({
      statusCode: 401,
      success: false,
      message: 'unautherized request from server',
    });
  }

  try {
    const userClaim = jwt.verify(token, refreshTokenSecret) as UserToken;

    const user = await User.findById(userClaim._id);

    if (!user) throw new ApiError(404, 'User not found');

    if (token !== user?.refreshToken)
      throw new ApiError(403, 'Invalid refresh token');

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOpt)
      .cookie('refreshToken', refreshToken, cookieOpt)
      .json(new ApiResponse(200, 'success', { accessToken, refreshToken }));
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'invalid token',
        error,
      });
      return;
    }
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'somthing went wrong',
      error,
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {
    const user = await User.findById(userId);

    const data: Partial<IUser> = {
      userName: user?.userName,
      publicName: user?.publicName,
      email: user?.email,
      phone: user?.phone,
      avatarUrl: user?.avatarUrl,
    };

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'fetch user',
      data,
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'somthing went wrong',
        error,
      });
    }
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  refreshUserToken,
  getCurrentUser,
};
