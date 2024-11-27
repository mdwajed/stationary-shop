// import { Request, Response } from 'express';

// import { Product } from '../productModel';
// import mongoose from 'mongoose';
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     console.log('Request Body:', req.body);

//     const { _id, ...productData } = req.body;

//     const product = new Product(productData);
//     const savedProduct = await product.save();

//     res.status(201).json({
//       message: 'Product created successfully',
//       success: true,
//       data: savedProduct,
//     });
//   } catch (error) {
//     console.error('Error creating product:', error); // Log full error details
//     res.status(500).json({
//       message: 'Server error while creating product',
//       success: false,
//       error: error instanceof Error ? error.message : error,
//     });
//   }
// };

// // Get All Stationery Products
// export const getAllProducts = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { searchTerm } = req.query;
//     let query = {};

//     if (searchTerm) {
//       query = {
//         $or: [
//           { name: { $regex: searchTerm, $options: 'i' } },
//           { brand: { $regex: searchTerm, $options: 'i' } },
//           { category: { $regex: searchTerm, $options: 'i' } },
//         ],
//       };
//     }

//     const products = await Product.find(query);
//     res.status(200).json({
//       message: 'Products retrieved successfully',
//       success: true,
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error while retrieving products',
//       success: false,
//       error,
//     });
//   }
// };

// // Get a Specific Stationery Product
// export const getProductById = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { productId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       res.status(400).json({
//         message: 'Invalid product ID',
//         success: false,
//       });
//       return;
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       res.status(404).json({
//         message: 'Product not found',
//         success: false,
//       });
//       return;
//     }

//     res.status(200).json({
//       message: 'Product retrieved successfully',
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error while retrieving product',
//       success: false,
//       error,
//     });
//   }
// };

// // Update a Stationery Product

// export const updateProduct = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { productId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       res.status(400).json({
//         message: 'Invalid product ID',
//         success: false,
//       });
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!updatedProduct) {
//       res.status(404).json({
//         message: 'Product not found',
//         success: false,
//       });
//       return;
//     }

//     res.status(200).json({
//       message: 'Product updated successfully',
//       success: true,
//       data: updatedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error while updating product',
//       success: false,
//       error,
//     });
//   }
// };
// // Delete a stationary Product
// export const deleteProduct = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const { productId } = req.params;

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       res.status(400).json({
//         message: 'Invalid product ID',
//         success: false,
//       });
//       return;
//     }

//     // Attempt to find and delete the product
//     const deletedProduct = await Product.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       res.status(404).json({
//         message: 'Product not found',
//         success: false,
//       });
//       return;
//     }

//     res.status(200).json({
//       message: 'Product deleted successfully',
//       success: true,
//       data: deletedProduct,
//     });
//   } catch (error) {
//     console.error('Error deleting product:', error); // Log error for debugging
//     res.status(500).json({
//       message: 'Server error while deleting product',
//       success: false,
//       error: error instanceof Error ? error.message : error,
//     });
//   }
// };

// ---------
// import { NextFunction, Request, Response } from 'express';
// import { Product } from '../productModel';
// import { Order } from '../orderModel';

// // Create an Order
// export const createOrder = async (req: Request, res: Response,
//   next: NextFunction) => {
//   try {
//     const { email, product: productId, quantity, totalPrice } = req.body;

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//       res.status(400).json({
//         message: 'Invalid email address',
//         success: false,
//       });
//       return;
//     }
//     // Find the product
//     const product = await Product.findById(productId);

//     if (!product) {
//       res.status(404).json({ message: 'Product not found', success: false });
//       return;
//     }

//     // Validate total price
//     const expectedPrice = product.price * quantity;
//     if (totalPrice !== expectedPrice) {
//       res.status(400).json({
//         message: `Total price mismatch. Expected: ${expectedPrice}`,
//         success: false,
//       });
//       return;
//     }
//     // Check stock availability
//     if (product.quantity < quantity) {
//       res
//         .status(400)
//         .json({ message: 'Insufficient stock available', success: false });
//       return;
//     }

//     // Reduce product quantity and update stock status
//     product.quantity -= quantity;
//     product.inStock = product.quantity > 0;
//     await product.save();

//     // Create the order
//     const order = new Order({
//       email,
//       product: productId,
//       quantity,
//       totalPrice,
//     });

//     const savedOrder = await order.save();

//     res.status(201).json({
//       message: 'Order created successfully',
//       success: true,
//       data: savedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error creating order',
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// // Calculate Revenue
// export const calculateRevenue = async (
//   _: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const revenue = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: '$totalPrice' },
//         },
//       },
//     ]);

//     const totalRevenue = revenue[0]?.totalRevenue || 0;

//     res.status(200).json({
//       message: 'Revenue calculated successfully',
//       success: true,
//       data: { totalRevenue },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error calculating revenue',
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };
// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];
//

//   "lint": "eslint src --ignore-path .eslintignore --ext .ts",
