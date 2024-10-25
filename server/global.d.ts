interface IUser {
  userName: string;
  publicName?: string;
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

type colors =
  | 'black'
  | 'white'
  | 'blue'
  | 'brown'
  | 'copper'
  | 'gold'
  | 'green'
  | 'grey'
  | 'navy'
  | 'pink'
  | 'orange';

type category =
  | 'shirts'
  | 'jeans'
  | 'jacket'
  | 'top'
  | 'skirts'
  | 'pants'
  | 'dresses'
  | 't-shirts'
  | 'hats'
  | 'socks';

interface ICategory {
  name: category;
}

interface IStore {
  name: string;
  description: string;
  avatarUrl: string;
  thumbnailUrl: string;
}

interface IProductImage {
  src: string;
}

type addressType = 'home' | 'work';
