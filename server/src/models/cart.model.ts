import mongoose from 'mongoose';

export interface ICart {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  size: number;
  color: colors;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
    },
    color: {
      type: String,
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
        'pink',
        'orange',
      ],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export { Cart };
