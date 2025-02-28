import { NextFunction, Request, Response } from 'express';
import { Order } from '../orderModel';
import mongoose from 'mongoose';
import { Product } from '../productModel';
import { AppError } from '../../../middleware/ErrorHandler';

// Create an Order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, product: productId, quantity, totalPrice } = req.body;

    const isValidEmail = (email: string): boolean =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validate email
    if (!email || !isValidEmail(email)) {
      throw new AppError('Invalid email address', 400);
    }

    // Validate product ID
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      throw new AppError('Invalid product ID', 400);
    }

    // Validate quantity
    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
      throw new AppError(
        'Invalid quantity. It must be a positive number.',
        400,
      );
    }

    // Validate total price
    if (!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0) {
      throw new AppError(
        'Invalid total price. It must be a positive number.',
        400,
      );
    }
    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check stock availability
    if (product.quantity < quantity) {
      throw new AppError('Insufficient stock available', 400);
    }
    // Check if total price matches expected price
    const expectedPrice = product.price * quantity;
    if (totalPrice !== expectedPrice) {
      throw new AppError(
        `Total price mismatch. Expected: ${expectedPrice}`,
        400,
      );
    }

    // Reduce product quantity and update stock status
    product.quantity -= quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    // Create the order
    const order = new Order({
      email,
      product: productId,
      quantity,
      totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// Calculate Revenue
export const calculateRevenue = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;
    // If no orders exist
    if (totalRevenue === 0) {
      res.status(200).json({
        message: 'No orders found. Revenue is zero.',
        status: true,
        data: { totalRevenue },
      });
      return;
    }
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    next(error);
  }
};
