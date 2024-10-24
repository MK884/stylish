import mongoose from 'mongoose';

interface IOrder {
  userId: mongoose.Types.ObjectId;
  addressId: mongoose.Types.ObjectId;
  cart: mongoose.Types.ObjectId[];
  status: 'pending' | 'cancelled';
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'addresses',
      required: true,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
      },
    ],
    status: {
      type: String,
      default: 'pending',
      enum: ['cancelled', 'pending'],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export { Order, IOrder };
