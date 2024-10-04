import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
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
  },
  { timestamps: true }
);


const Categories = mongoose.model<ICategory>('categories', CategorySchema)

export { Categories }