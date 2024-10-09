interface onBoardItemProps {
  id: number;
  title: string;
  description: string;
  ImgSource: ImageSourcePropType;
}

type Categories =
  | 'electronics'
  | 'jewelery'
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
  user: UserData | null;
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

type size = 22 | 24 | 26 | 28 | 30 | 32 | 34;

interface IStore {
  _id: string;
  name: string;
  description?: string;
  avatarUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}

type IProductImage = {
  src: string;
};

interface IProduct {
  _id: string;
  title: string;
  category: category;
  color: Array<colors>;
  size: Array<size>;
  description?: string;
  store: Array<Istore>;
  price: number;
  productImg: Array<IProductImage>;
  quantity?: number;
  discount?: number;
  rating?:number;
}

interface StoreCardProps {
  height?: number;
  width?: number;
  item: IStore;
}

interface ProductCard {
  item: IProduct;
  height?: number;
  width?: number;
}
