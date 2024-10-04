import mongoose from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  category: category;
  size: Array<number>;
  store: mongoose.Types.ObjectId;
  price: number;
  discount?: number;
  color: Array<colors>;
  rating?: number;
  productImg: IProductImage[];
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: [String],
      required: true,
      enum: [
        'black',
        'white',
        'blue',
        'brown',
        'copper',
        'gold',
        'green',
        'grey',
        'navy',
        'neutral',
        'orange',
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: [
        'shirts',
        'jeans',
        'jacket',
        'top',
        'skirts',
        'pants',
        'dresses',
        't-shirts',
        'hats',
        'socks',
      ],
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'stores',
    },
    size: {
      type: [Number],
    },
    productImg: [
      {
        src: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export { Product };
