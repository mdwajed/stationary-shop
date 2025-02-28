"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = require("../productModel");
const mongoose_1 = __importDefault(require("mongoose"));
const ErrorHandler_1 = require("../../../middleware/ErrorHandler");
const createProduct = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        const { _id, ...productData } = req.body;
        console.log(productData);
        const product = new productModel_1.Product(productData);
        const savedProduct = await product.save();
        res.status(201).json({
            message: 'Product created successfully',
            success: true,
            data: savedProduct,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const appError = new ErrorHandler_1.AppError('Validation failed', 400, error.errors);
            return next(appError);
        }
        next(error);
    }
};
exports.createProduct = createProduct;
// Get All Stationery Products
const getAllProducts = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            };
        }
        const products = await productModel_1.Product.find(query);
        res.status(200).json({
            message: 'Products retrieved successfully',
            status: true,
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
// Get a Specific Stationery Product
const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new ErrorHandler_1.AppError('Invalid product ID', 400);
        }
        const product = await productModel_1.Product.findById(productId);
        if (!product) {
            throw new ErrorHandler_1.AppError('Product not found', 404);
        }
        res.status(200).json({
            message: 'Product retrieved successfully',
            status: true,
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
// Update a Stationery Product
const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new ErrorHandler_1.AppError('Invalid product ID', 400);
        }
        const updatedProduct = await productModel_1.Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            throw new ErrorHandler_1.AppError('Product not found', 404);
        }
        res.status(200).json({
            message: 'Product updated successfully',
            status: true,
            data: updatedProduct,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const appError = new ErrorHandler_1.AppError('Validation failed', 400, error.errors);
            return next(appError);
        }
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new ErrorHandler_1.AppError('Invalid product ID', 400);
        }
        // Attempt to find and delete the product
        const deletedProduct = await productModel_1.Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new ErrorHandler_1.AppError('Product not found', 404);
        }
        res.status(200).json({
            message: 'Product deleted successfully',
            status: true,
            data: deletedProduct,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
