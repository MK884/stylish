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
  rating?: number;
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
  tailwindClass?: string;
}

interface tab {
  label: string;
  content: React.ReactNode;
}

interface AboutStore {
  store: IStore;
  total?: number;
}

interface StoreOverview {
  store: IStore;
  products: Array<IProduct>;
}

type addressType = 'home' | 'work';

interface IAddress {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  type?: addressType;
  createdAt: string;
  updatedAt: string;
}

interface IDropDown {
  data: Array<string>;
  onOptionSelecte: (option: string) => void;
  error?: string;
  label?: string;
  tailwindCss?: string;
}

interface ICountry {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

interface IState {
  id: number;
  name: string;
  iso2: string;
}

interface ICity {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

interface ICartProduct {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  size: number;
  color: string;
  product: Array<IProduct>;
  createdAt: string;
  updatedAt: string;
}

interface ICartProductCard {
  item: ICartProduct;
  onView: () => void;
  onSelect: (price: number, isUpdate?: boolean) => void;
  onDelete: () => void;
  onQuantityUpdate: (quantity: number, id: string) => void;
  isSeleceted: boolean;
}

interface IOrder {
  _id: string;
  userId: string;
  addressId: string;
  status: 'pending' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  address: Array<IAddress>;
  cartDetails: Array<ICartProduct>;
}
