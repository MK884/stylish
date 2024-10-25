import { ImageSourcePropType } from 'react-native';

export const productOnSlae: productPorps[] = [
  {
    id: 1,
    ImgSrc: require('@/assets/images/ps_1.png'),
    title: 'Bershka Platform Sandals with Buckle',
    price: 49,
    salePrice: 29,
  },
  {
    id: 2,
    ImgSrc: require('@/assets/images/ps_2.png'),
    title: 'Bershka Sport Tennis with Detail',
    price: 64,
    salePrice: 37,
  },
  {
    id: 3,
    ImgSrc: require('@/assets/images/ps_1.png'),
    title: 'Bershka Platform Sandals with Buckle',
    price: 49,
    salePrice: 29,
  },
  {
    id: 4,
    ImgSrc: require('@/assets/images/ps_2.png'),
    title: 'Bershka Platform Sandals with Buckle',
    price: 49,
    salePrice: 29,
  },
];

export const store: productPorps[] = [
  {
    id: 1,
    title: "Levi's",
    logo: require('@/assets/images/levis_logo.png'),
    bg: require('@/assets/images/levis_bg.png'),
  },
  {
    id: 2,
    title: 'Zara',
    logo: require('@/assets/images/zara_logo.png'),
    bg: require('@/assets/images/zara_bg.jpg'),
  },

  {
    id: 3,
    title: 'Bershka',
    logo: require('@/assets/images/bershka_logo.jpg'),
    bg: require('@/assets/images/bershka_bg.jpg'),
  },
  {
    id: 4,
    title: 'Adidas',
    logo: require('@/assets/images/adidas_logo.png'),
    bg: require('@/assets/images/adidas_bg.png'),
  },
  {
    id: 5,
    title: 'Lacoste',
    logo: require('@/assets/images/lacoste_logo.png'),
    bg: require('@/assets/images/lacoste_bg.png'),
  },
];
export const freshCollection: productPorps[] = [
  {
    id: 1,
    title: "Levi's",
    logo: require('@/assets/images/levis_logo.png'),
    bg: require('@/assets/images/levis_bg.png'),
  },

  {
    id: 2,
    title: 'Zara',
    logo: require('@/assets/images/zara_logo.png'),
    bg: require('@/assets/images/zara_bg.jpg'),
  },
  {
    id: 3,
    title: 'Bershka',
    logo: require('@/assets/images/bershka_logo.jpg'),
    bg: require('@/assets/images/bershka_bg.jpg'),
  },
  {
    id: 4,
    title: 'Adidas',
    logo: require('@/assets/images/adidas_logo.png'),
    bg: require('@/assets/images/adidas_bg.png'),
  },
  {
    id: 5,
    title: 'Lacoste',
    logo: require('@/assets/images/lacoste_logo.png'),
    bg: require('@/assets/images/lacoste_bg.png'),
  },
];

export interface productPorps {
  id: number;
  logo?: ImageSourcePropType;
  bg?: ImageSourcePropType;
  title?: string;
  ImgSrc?: ImageSourcePropType;
  price?: number;
  salePrice?: number;
}
