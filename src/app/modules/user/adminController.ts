import { Request, Response } from 'express';

import { User } from '../userModel';
import { Product } from '../productModel';

// Block User
export const blockUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    user.isBlocked = true;
    await user.save();

    res
      .status(200)
      .json({ message: 'User blocked successfully', status: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Delete Blog (Admin)
export const deleteProductByAdmin = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) throw new Error('Blog not found');

    await product.deleteOne();

    res
      .status(200)
      .json({
        message: 'Blog deleted successfully',
        status: true,
        data: product,
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
