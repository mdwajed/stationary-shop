import { Request, Response } from "express";
import Product from "../models/productModel";

// Create a Stationery Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

// Get All Stationery Products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { searchTerm } = req.query;
    let query = {};

    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(query);
    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};

// Get a Specific Stationery Product
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};

// Update a Stationery Product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are applied during the update
      }
    );

    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

// Delete a stationary Product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    // Find and delete the product
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
