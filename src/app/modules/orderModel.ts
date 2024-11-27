import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order/order.interface';

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
