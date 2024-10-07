interface onBoardItemProps {
  id: number;
  title: string;
  description: string;
  ImgSource: ImageSourcePropType;
}

type Categories =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

  interface Token {
    accessToken: string;
    refreshToken: string;
  }

  interface UserData extends Token {
    userName: string;
    avatarUrl?: string;
}

interface AuthSlice {
    isAuth: boolean;
    user : UserData | null;
}

interface IUser {
  userName: string;
  publicName?: string;
  email: string;
  password: string;
  phone?: string;
  avatarUrl?: string;
  refreshToken?: string;
}