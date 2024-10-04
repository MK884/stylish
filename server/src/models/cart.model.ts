import mongoose from 'mongoose';

export interface ICart {
  userId: mongoose.Types.ObjectId;
  products: Array<{ productId: mongoose.Types.ObjectId; quantity: number }>;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'users',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export { Cart };
