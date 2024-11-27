import { NextFunction, Request, Response } from 'express';
import { Product } from '../productModel';
import mongoose from 'mongoose';
import { AppError } from '../../../middleware/ErrorHandler';
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('Request Body:', req.body);

    const { _id, ...productData } = req.body;
    console.log(productData);
    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: savedProduct,
    });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const appError: AppError = new Error('Validation failed') as AppError;
      appError.status = 400;
      appError.errors = error.errors; // Include detailed validation errors
      return next(appError);
    }
    next(error); // Pass other errors to the global error handler
  }
};

// Get All Stationery Products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

    const products = await Product.find(query);
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Get a Specific Stationery Product
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error('Invalid product ID') as AppError;
      error.status = 400;
      throw error;
    }

    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error('Product not found') as AppError;
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Update a Stationery Product

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error('Invalid Product ID') as AppError;
      error.status = 404;
      throw error;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      const error = new Error('Product not found') as AppError;
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: updatedProduct,
    });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const appError: AppError = new Error('Validation failed') as AppError;
      appError.status = 400;
      appError.errors = error.errors; // Include detailed validation errors
      return next(appError);
    }
    next(error); // Pass other errors to the global error handler
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error('Invalid product ID') as AppError;
      error.status = 400;
      throw error; // Throw the error to be handled by the errorHandler
    }

    // Attempt to find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      const error = new Error('Product not found') as AppError;
      error.status = 404;
      throw error; // Throw the error to be handled by the errorHandler
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
