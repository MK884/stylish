import { Request, Response } from 'express';
import { z } from 'zod';
import {
  ApiError,
  ApiResponse,
  deleteSingleAsset,
  uploadOnCloudinary,
} from '../utils';
import { User } from '../models';
import { cookieOpt, CustomeRequest } from '../constant';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const registerUserschema = z.object({
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
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
    throw new ApiError(
      400,
      'Validation failed',
      userInput?.error?.issues?.map((issue) => ({
        path: issue?.path,
        message: issue?.message,
      }))
    );
  }

  const { email, password, userName } = userInput?.data;

  // check if user is already registered by username

  try {
    const isExist = await User.findOne({ userName });

    if (isExist) {
      throw new ApiError(406, 'username already taken');
    }

    const user = await User.create({ userName, email, password });

    const userData: Partial<IUser> = {
      userName: user.userName,
      email: user.email,
    };

    res
      .status(200)
      .json(new ApiResponse(200, 'User created successfully', userData));
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(500, error.message, error);
    }
  }
};

const loginUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const userInput = loginUserSchema.safeParse(req?.body);

  if (!userInput?.success) {
    res.status(400).json(
      new ApiError(
        400,
        'Validation failed',
        userInput?.error?.issues.map((issue) => ({
          path: issue?.path,
          message: issue?.message,
        }))
      )
    );
  } else {
    const { email, password } = userInput?.data;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const isPasswordCorrect = await user?.isPasswordCorrect(password);

      if (!isPasswordCorrect) {
        throw new ApiError(403, 'incorrect user credentials');
      }

      const accessToken = user?.generateAccessToken();
      const refreshToken = user?.generateRefreshToken();

      if (!accessToken || !refreshToken)
        throw new ApiError(500, 'Somthing went wrong while generating tokens');

      user.refreshToken = refreshToken;

      user.save({ validateBeforeSave: false });

      const userData = {
        email: user?.email,
        phone: user?.phone,
        avatarUrl: user?.avatarUrl,
        firstName: user?.firstName,
        lastName: user?.lastName,
        userName: user?.userName,
        refreshToken,
        accessToken,
      };

      res
        .status(200)
        .cookie('accessToken', accessToken, cookieOpt)
        .cookie('refreshToken', refreshToken, cookieOpt)
        .json(new ApiResponse(200, 'Login successful', userData));
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(500, error.message, error);
      }
    }
  }
};

const logoutUser = async (
  req: CustomeRequest,
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
      throw new ApiError(500, error.message, error);
    }
  }

  res
    .status(200)
    .clearCookie('accessToken', cookieOpt)
    .clearCookie('refreshToken', cookieOpt)
    .json(new ApiResponse(202, 'Logout successfully'));
};

const updateUser = async (
  req: CustomeRequest,
  res: Response
): Promise<void | undefined> => {
  const { email, firstName, lastName, phone } = req?.body;

  const avatar = req?.file?.path;

  const isEmpty = !(email || firstName || lastName || phone || avatar);

  if (isEmpty) throw new ApiError(400, 'At least one field must be provided');

  const userInput: Partial<IUser> = {};

  if (email) userInput.email = email;
  if (firstName) userInput.firstName = firstName;
  if (lastName) userInput.lastName = lastName;
  if (phone) userInput.phone = phone;

  try {
    if (avatar) {
      const cloudResponse = await uploadOnCloudinary(avatar);
      if (!cloudResponse?.url)
        throw new ApiError(500, 'Failed to upload avatar');

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

    const userData = {
      email: user?.email,
      phone: user?.phone,
      avatarUrl: user?.avatarUrl,
      firstName: user?.firstName,
      lastName: user?.lastName,
      userName: user?.userName,
    };

    res
      .status(200)
      .json(new ApiResponse(200, 'User updated successfully', userData));
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(500, error.message, error);
    }
  }
};

const deleteUser = async (
  req: CustomeRequest,
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

    res.status(202).json(new ApiResponse(202, 'user deleted successfully'));
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(500, error.message, error);
    }
  }
};

const refreshUserToken = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  const token = req?.body?.refreshToken || req?.cookies?.refreshToken;

  if (!token) throw new ApiError(401, 'Unautherized Request from Server');

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
       res
          .status(403)
          .json(new ApiError(403, 'Invalid Token', error));
  }
   res.json(new ApiError(500, 'somthing went wrong'));
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  refreshUserToken,
};
