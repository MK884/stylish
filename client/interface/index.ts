import Icon from '@expo/vector-icons/FontAwesome';
import { GestureResponderEvent, TextProps } from 'react-native';

export interface IconProp {
  name: keyof typeof Icon.glyphMap;
  size?: number;
  tailwindClass?: string;
  titel?: string;
  textStyle?: TextProps['style'];
  onPress?: () => void;
  IconColor?: string;
  [key: string]: any;
}

export interface ButtonProps {
  title?: string;
  onPress?: (e: GestureResponderEvent) => void;
  textStyle?: TextProps['style'];
  tailwindClass?: string;
  disabled?: boolean;
}

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
  error?: string;
  IconName?: keyof typeof Icon.glyphMap;
  tailwindClass?: string;
  IconStyle?: TextProps['style'];
  [key: string]: any;
}

// const productTest: IProduct[] = [
//   {
//     _id: '6700db7a76369370552826c5',
//     title: 'Slim Fit Stretch Cotton Poplin Shirt',
//     description:
//       'Own your style in this fitted shirt. Made from premium stretch cotton, cut to flatter without limiting your movements. The perfect blend of comfort and elegance, great under a suit jacket.',
//     color: ['black'],
//     price: 64,
//     discount: 10,
//     rating: 4.4,
//     category: 'shirts',
//     store: [
//       {
//         _id: '67001896f887c9b4591df58a',
//         name: 'Lacoste',
//         description:
//           "Shop LACOSTE online for men's, women's & kids polos, clothing, shoes, watches, bags, fragrances and sportswear. Free shipping on orders over $75.",
//         avatarUrl:
//           'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://lacoste.in&size=64',
//         thumbnailUrl:
//           'https://www.shutterstock.com/image-photo/mulhouse-france-17-july-2021-260nw-2009265557.jpg',
//         createdAt: '2024-10-04T16:32:22.006Z',
//         updatedAt: '2024-10-04T16:32:22.006Z',
//         __v: 0,
//       },
//     ],
//     size: [26, 28, 30, 34],
//     quantity: 12,
//     productImg: [
//       {
//         src: 'https://www.lacoste.in/media/catalog/product/c/h/ch5620_031_20.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900',
//       },
//       {
//         src: 'https://www.lacoste.in/media/catalog/product/c/h/ch5620_031_22.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900',
//       },
//       {
//         src: 'https://www.lacoste.in/media/catalog/product/c/h/ch5620_031_l1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900',
//       },
//     ],
//   },
// ];
