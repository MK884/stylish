import { Types } from 'mongoose';

interface IAddress {
  userId: Types.ObjectId;
  address: Array<string>;
}
