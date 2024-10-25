import { endPoints } from './endpoints';
import { onBoardData } from './onBoardingData';

export { onBoardData, endPoints };

export const categories: category[] = [
  'dresses',
  'hats',
  'jacket',
  'jeans',
  'pants',
  'shirts',
  'skirts',
  'socks',
  't-shirts',
  'top',
];

export const colors: colors[] = [
  'black',
  'white',
  'blue',
  'brown',
  'copper',
  'gold',
  'green',
  'grey',
  'navy',
  'pink',
  'orange',
];

interface collection {
  label: category;
  src: string;
}

export const collection: collection[] = [
  {
    label: 'dresses',
    src: 'https://calvinklein.scene7.com/is/image/CalvinKlein/18804110_230_main?wid=864&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp',
  },
  {
    label: 'hats',
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/70bd29f5-263a-474b-ab07-1e36253971b6/U+NK+DF+FLY+CAP+U+CB+P.png',
  },
  {
    label: 'jacket',
    src: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/035481ebc4ff442093ea464c2b461e77_9366/Ultimate_Running_Conquer_the_Elements_COLD.RDY_Jacket_Yellow_IL1968_HM1.jpg',
  },
  {
    label: 'jeans',
    src: 'https://levi.in/cdn/shop/files/729110022-Side.jpg?v=1719850363',
  },
  {
    label: 'pants',
    src: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3b31e25fe3d940599036d1bc9fad85a2_9366/Y-3_Track_Pants_Black_IR6267_21_model.jpg',
  },
  {
    label: 'shirts',
    src: 'https://calvinklein.scene7.com/is/image/CalvinKlein/22891136_540_main?wid=864&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp',
  },
  {
    label: 'skirts',
    src: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d1d97a9c-9bd1-49c8-9224-f775868aeeb8/AS+W+NSW+ESSTL+WVN+MR+CGO+MDI.png',
  },
  {
    label: 'socks',
    src: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/54557e6223e94ce381a8af1000973d0e_9366/Running_X-City_HEAT.RDY_Reflective_Socks_Orange_HR7045_03_standard.jpg',
  },
  {
    label: 't-shirts',
    src: 'https://static.zara.net/assets/public/30da/61c2/2ef24c03af1d/f36a70a81dbe/06096311401-a1/06096311401-a1.jpg?ts=1727860708665&w=750&f=auto',
  },
  {
    label: 'top',
    src: 'https://static.zara.net/assets/public/a540/8ea9/8ad041a79353/97bf68ed4ab5/03641842621-a1/03641842621-a1.jpg?ts=1725022843834&w=750&f=auto',
  },
];

export const colorCode = {
  black: '#0E0E10',
  white: 'white',
  blue: '#4B7EFF',
  brown: '#AE7250',
  copper: '#D69E83',
  gold: '#E1C96D',
  green: '#2EA690',
  grey: '#9F9F9F',
  navy: '#163564',
  pink: 'pink',
  orange: 'orange',
};

export const ClothesSize: { size: size; label: string }[] = [
  {
    size: 22,
    label: 'xxs',
  },
  {
    size: 24,
    label: 'xs',
  },
  {
    size: 26,
    label: 's',
  },
  {
    size: 28,
    label: 'm',
  },
  {
    size: 30,
    label: 'l',
  },
  {
    size: 32,
    label: 'xl',
  },
  {
    size: 34,
    label: 'xxl',
  },
];

export const colorOptions: { color: string; code: string }[] = [
  {
    color: 'black',
    code: '#0E0E10',
  },
  {
    color: 'white',
    code: 'white',
  },
  {
    color: 'blue',
    code: '#4B7EFF',
  },
  {
    color: 'brown',
    code: '#AE7250',
  },
  {
    color: 'copper',
    code: '#D69E83',
  },
  {
    color: 'gold',
    code: '#E1C96D',
  },
  {
    color: 'green',
    code: '#2EA690',
  },
  {
    color: 'grey',
    code: '#9F9F9F',
  },
  {
    color: 'navy',
    code: '#163564',
  },
  {
    color: 'pink',
    code: 'pink',
  },
  {
    color: 'orange',
    code: 'orange',
  },
];
