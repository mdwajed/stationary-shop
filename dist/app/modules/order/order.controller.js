"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRevenue = exports.createOrder = void 0;
const orderModel_1 = require("../orderModel");
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = require("../productModel");
const ErrorHandler_1 = require("../../../middleware/ErrorHandler");
// Create an Order
const createOrder = async (req, res, next) => {
    try {
        const { email, product: productId, quantity, totalPrice } = req.body;
        // Validate email format
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!email || !emailRegex.test(email)) {
        //   const error = new Error('Invalid email address') as AppError;
        //   error.status = 400;
        //   throw error;
        // }
        // // Validate product ID format
        // if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        //   const error = new Error('Invalid product ID') as AppError;
        //   error.status = 400;
        //   throw error;
        // }
        // // Validate quantity
        // if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
        //   const error = new Error(
        //     'Invalid quantity. It must be a positive number.',
        //   ) as AppError;
        //   error.status = 400;
        //   throw error;
        // }
        // // Validate total price
        // if (!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0) {
        //   const error = new Error(
        //     'Invalid total price. It must be a positive number.',
        //   ) as AppError;
        //   error.status = 400;
        //   throw error;
        // }
        // Find the product
        // Helper functions for validation
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        // Validate email
        if (!email || !isValidEmail(email)) {
            throw new ErrorHandler_1.AppError('Invalid email address', 400);
        }
        // Validate product ID
        if (!productId || !mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new ErrorHandler_1.AppError('Invalid product ID', 400);
        }
        // Validate quantity
        if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
            throw new ErrorHandler_1.AppError('Invalid quantity. It must be a positive number.', 400);
        }
        // Validate total price
        if (!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0) {
            throw new ErrorHandler_1.AppError('Invalid total price. It must be a positive number.', 400);
        }
        // Find product
        const product = await productModel_1.Product.findById(productId);
        if (!product) {
            throw new ErrorHandler_1.AppError('Product not found', 404);
        }
        // Check stock availability
        if (product.quantity < quantity) {
            throw new ErrorHandler_1.AppError('Insufficient stock available', 400);
        }
        // Check if total price matches expected price
        const expectedPrice = product.price * quantity;
        if (totalPrice !== expectedPrice) {
            throw new ErrorHandler_1.AppError(`Total price mismatch. Expected: ${expectedPrice}`, 400);
        }
        // Reduce product quantity and update stock status
        product.quantity -= quantity;
        product.inStock = product.quantity > 0;
        await product.save();
        // Create the order
        const order = new orderModel_1.Order({
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
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
// Calculate Revenue
const calculateRevenue = async (_, res, next) => {
    try {
        const revenue = await orderModel_1.Order.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.calculateRevenue = calculateRevenue;
