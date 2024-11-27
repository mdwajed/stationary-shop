"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
productRouter.post('/', product_controller_1.createProduct);
productRouter.get('/', product_controller_1.getAllProducts);
productRouter.get('/:productId', product_controller_1.getProductById);
productRouter.put('/:productId', product_controller_1.updateProduct);
productRouter.delete('/:productId', product_controller_1.deleteProduct);
exports.default = productRouter;
