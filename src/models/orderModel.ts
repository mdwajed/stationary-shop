import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./productModel";

export interface IOrder extends Document {
  email: string;
  product: IProduct["_id"];
  quantity: number;
  totalPrice: number;
}

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
