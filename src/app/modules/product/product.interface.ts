import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}
