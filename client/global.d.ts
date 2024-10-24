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

// {
//   "id": 1,
//   "name": "Afghanistan",
//   "iso2": "AF",
//   "iso3": "AFG",
//   "phonecode": "93",
//   "capital": "Kabul",
//   "currency": "AFN",
//   "native": "افغانستان",
//   "emoji": "🇦🇫"
// },

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

// {
//   "id": 4006,
//   "name": "Meghalaya",
//   "iso2": "ML"
// },

interface IState {
  id: number;
  name: string;
  iso2: string;
}

// {
//   "id": 57589,
//   "name": "Achalpur",
//   "latitude": "21.25665000",
//   "longitude": "77.51006000"
// },

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

// {
//   "_id": "671a50476ac1acfba4661794",
//   "userId": "6702b063e0fa351206c52ad0",
//   "addressId": "671253a56a1c6b1d6b69f014",
//   "cart": [
//       "67175ffa330148cc210279c1",
//       "6719329fa9f5470811a47b7d"
//   ],
//   "status": "pending",
//   "createdAt": "2024-10-24T13:48:55.476Z",
//   "updatedAt": "2024-10-24T13:48:55.476Z",
//   "__v": 0,
//   "address": [
//       {
//           "_id": "671253a56a1c6b1d6b69f014",
//           "userId": "6702b063e0fa351206c52ad0",
//           "fullName": "khalid",
//           "phone": 4545454545,
//           "country": "Afghanistan",
//           "state": "Ghazni",
//           "city": "Ghazni",
//           "pincode": "123456",
//           "address": "test address for test.com sasas",
//           "type": "home",
//           "createdAt": "2024-10-18T12:25:09.190Z",
//           "updatedAt": "2024-10-18T16:03:06.871Z",
//           "__v": 0
//       }
//   ],
//   "cartDetails": [
//       {
//           "_id": "67175ffa330148cc210279c1",
//           "userId": "6702b063e0fa351206c52ad0",
//           "productId": "6700d83612f732e4af4e2221",
//           "quantity": 3,
//           "size": 28,
//           "color": "black",
//           "createdAt": "2024-10-22T08:19:06.114Z",
//           "updatedAt": "2024-10-24T08:51:51.934Z",
//           "__v": 0,
//           "product": [
//               {
//                   "_id": "6700d83612f732e4af4e2221",
//                   "title": "Mock-neck jumpsuit in satin with tie belt",
//                   "description": "A mock-neck jumpsuit crafted in fluent satin by HUGO. This regular-fit piece features a tie belt and cut-out detail at the back.",
//                   "color": [
//                       "black"
//                   ],
//                   "price": 140,
//                   "discount": 0,
//                   "rating": 4.5,
//                   "category": "dresses",
//                   "store": "67001896f887c9b4591df58b",
//                   "size": [
//                       26,
//                       30,
//                       28,
//                       32,
//                       34
//                   ],
//                   "quantity": 100,
//                   "productImg": [
//                       {
//                           "src": "https://images.hugoboss.com/is/image/boss/hbeu50526176_001_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1727783211000&wid=1200&hei=1818&fmt=webp",
//                           "_id": "6700d83612f732e4af4e2222"
//                       },
//                       {
//                           "src": "https://images.hugoboss.com/is/image/boss/hbeu50526176_001_310?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1727783211000&wid=1200&hei=1818&fmt=webp",
//                           "_id": "6700d83612f732e4af4e2223"
//                       },
//                       {
//                           "src": "https://images.hugoboss.com/is/image/boss/hbeu50526176_001_100?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1727783211000&wid=1200&hei=1818&fmt=webp",
//                           "_id": "6700d83612f732e4af4e2224"
//                       }
//                   ],
//                   "createdAt": "2024-10-05T06:09:58.684Z",
//                   "updatedAt": "2024-10-05T06:09:58.684Z",
//                   "__v": 0
//               }
//           ]
//       },
//       {
//           "_id": "6719329fa9f5470811a47b7d",
//           "userId": "6702b063e0fa351206c52ad0",
//           "productId": "67002bb3dce88ad541398650",
//           "quantity": 2,
//           "size": 28,
//           "color": "green",
//           "createdAt": "2024-10-23T17:30:07.303Z",
//           "updatedAt": "2024-10-24T08:51:51.936Z",
//           "__v": 0,
//           "product": [
//               {
//                   "_id": "67002bb3dce88ad541398650",
//                   "title": "OVERDYED DENIM JACKET",
//                   "description": "Relaxed fit jacket made of cotton denim. Lapel collar and long sleeves with elasticated cuffs. Hip welt pockets. Interior pocket detail. Faded effect with a coloured finish. Elasticated hem. Zip-up front.",
//                   "color": [
//                       "brown"
//                   ],
//                   "price": 80,
//                   "discount": 0,
//                   "rating": 3.4,
//                   "category": "jacket",
//                   "store": "66ffc38703443f9357c73712",
//                   "size": [
//                       26,
//                       28,
//                       30,
//                       32
//                   ],
//                   "productImg": [
//                       {
//                           "src": "https://static.zara.net/assets/public/5f44/70dd/cd78496db4c9/f04ec981ca5f/06318400778-a1/06318400778-a1.jpg?ts=1721985036340&w=750&f=auto",
//                           "_id": "67002bb3dce88ad541398651"
//                       },
//                       {
//                           "src": "https://static.zara.net/assets/public/e00d/6ed7/8b1040468a70/a8d764b6fc04/06318400778-a2/06318400778-a2.jpg?ts=1721985037445&w=750&f=auto",
//                           "_id": "67002bb3dce88ad541398652"
//                       },
//                       {
//                           "src": "https://static.zara.net/assets/public/2530/b308/fc394699979d/74ee5569434d/06318400778-a6/06318400778-a6.jpg?ts=1721985037118&w=750&f=auto",
//                           "_id": "67002bb3dce88ad541398653"
//                       }
//                   ],
//                   "createdAt": "2024-10-04T17:53:55.667Z",
//                   "updatedAt": "2024-10-04T17:53:55.667Z",
//                   "__v": 0,
//                   "quantity": 12
//               }
//           ]
//       }
//   ]
// }
