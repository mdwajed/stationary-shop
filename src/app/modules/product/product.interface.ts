import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}
