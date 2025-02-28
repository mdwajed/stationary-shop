import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product/product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, 'Product name is required'] },
    brand: { type: String, required: true },
    image: { type: String, required: false },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      required: [true, 'Category is required'],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
