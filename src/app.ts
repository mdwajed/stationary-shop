// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import router from "./routes/routes";

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
import express, { Application } from 'express';
import cors from 'cors';
import productRouter from './app/modules/product/product.route';
import orderRouter from './app/modules/order/order.route';
import { errorHandler } from './middleware/ErrorHandler';
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.url}`);
//   console.log('Request body:', req.body);
//   next();
// });
app.use(errorHandler);
console.log(`Current working directory: ${process.cwd()}`);
export default app;
