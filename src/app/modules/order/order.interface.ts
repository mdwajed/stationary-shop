import mongoose, { Document } from 'mongoose';
import { IProduct } from '../product/product.interface';

export interface IOrder extends Document {
  email: string;
  product: mongoose.Types.ObjectId | IProduct;
  quantity: number;
  totalPrice: number;
}
