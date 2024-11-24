import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../components/product";
import { calculateRevenue, createOrder } from "../components/order";

const router = express.Router();

// Product Routes
router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

// Order Routes
router.post("/orders", createOrder);
router.get("/orders/revenue", calculateRevenue);

export default router;
