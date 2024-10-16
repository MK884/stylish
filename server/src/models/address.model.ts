import mongoose from 'mongoose';

export interface IAddress {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  phone: number;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  type?: addressType;
}

const AddressSchema = new mongoose.Schema<IAddress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'home',
      enum: ['work', 'home'],
    },
  },
  { timestamps: true }
);

const Address = mongoose.model<IAddress>('Address', AddressSchema);

export { Address };
