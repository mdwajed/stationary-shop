"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import router from "./routes/routes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import bodyParser from "body-parser";
// import connectDB from "./utils/connectDB";
// // Load environment variables from .env file
// dotenv.config();
// const app = express();
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// // Connect to MongoDB
// connectDB();
// // Routes
// app.use("/api", router);
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./app/modules/product/product.route"));
const order_route_1 = __importDefault(require("./app/modules/order/order.route"));
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_route_1.default);
app.use('/api/orders', order_route_1.default);
// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.url}`);
//   console.log('Request body:', req.body);
//   next();
// });
app.use(ErrorHandler_1.errorHandler);
console.log(`Current working directory: ${process.cwd()}`);
exports.default = app;
