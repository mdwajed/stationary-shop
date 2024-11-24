import { Request, Response } from "express";
import Order from "../models/orderModel";
import Product from "../models/productModel";

// Create an Order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, product: productId, quantity, totalPrice } = req.body;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found", success: false });
      return;
    }

    // Check stock availability
    if (product.quantity < quantity) {
      res
        .status(400)
        .json({ message: "Insufficient stock available", success: false });
      return;
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
      message: "Order created successfully",
      success: true,
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Calculate Revenue
export const calculateRevenue = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating revenue",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
