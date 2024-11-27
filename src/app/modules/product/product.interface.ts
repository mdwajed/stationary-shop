import { Document } from 'mongoose';

// export enum Category {
//   Writing = 'Writing',
//   OfficeSupplies = 'Office Supplies',
//   ArtSupplies = 'Art Supplies',
//   Educational = 'Educational',
//   Technology = 'Technology',
// }

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}
