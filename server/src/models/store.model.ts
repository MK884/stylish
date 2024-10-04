import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema<IStore>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model<IStore>('Store', StoreSchema);

export { Store };
