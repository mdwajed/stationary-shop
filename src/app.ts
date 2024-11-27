import express, { Application, NextFunction, Request, Response } from 'express';
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
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome');
  console.log(`Incoming ${req.method} request to ${req.url}`);
  console.log('Request body:', req.body);
  next();
});
app.use(errorHandler);
console.log(`Current working directory: ${process.cwd()}`);
export default app;
