
  interface IUser {
    userName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: number;
    avatarUrl?: string;
    refreshToken?: string;
    isPasswordCorrect: (password: string) => Promise<boolean>;
    generateAccessToken: Function;
    generateRefreshToken: Function;
  }

  interface UserToken {
    _id: string;
    email: string;
  }

  namespace Express {
    interface Request {
      user: UserToken;
    }
  }

