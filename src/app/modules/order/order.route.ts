import express from 'express';
import { createOrder, calculateRevenue } from '../order/order.controller';

const orderRouter = express.Router();

orderRouter.post('/', createOrder);
orderRouter.get('/revenue', calculateRevenue);

export default orderRouter;
