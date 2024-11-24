import mongoose, { Document, Schema } from "mongoose";

enum Category {
  Writing = "Writing",
  OfficeSupplies = "Office Supplies",
  ArtSupplies = "Art Supplies",
  Educational = "Educational",
  Technology = "Technology",
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  category: Category;
  description: string;
  quantity: number;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    category: { type: String, enum: Object.values(Category), required: true },
    description: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be a positive number"],
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
