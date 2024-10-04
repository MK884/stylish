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
  | 'neutral'
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

// Men's Clothing
// T-shirts
// Shirts
// Jeans
// Jackets
// Suits
// Activewear

// Women's Clothing
// Dresses
// Tops
// Skirts
// Pants
// Blouses
// Outerwear

// Kids' Clothing
// Boys' Clothing
// Girls' Clothing
// Baby Clothes
// School Uniforms

// Footwear
// Sneakers
// Sandals
// Boots
// Formal Shoes
// Heels

// Accessories
// Hats
// Bags
// Belts
// Scarves
// Jewelry

// Sportswear
// Gym Wear
// Running Gear
// Yoga Pants
// Swimwear

// Underwear & Loungewear
// Lingerie
// Pajamas
// Socks
// Robes

// Seasonal
// Winter Wear
// Summer Wear
// Rain Gear
