import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import {
  AuthenticationError,
  AuthorizationError,
  isErrorWithMessage,
} from '../utils/errors';
import { errorResponse } from './errorsResponse';
import { User } from '../app/modules/userModel';

interface DecodedToken {
  id: string;
  isAdmin: boolean;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json(errorResponse('Unauthorized'));
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret',
    ) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(errorResponse('Invalid token', error));
  }
};

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AuthenticationError('No token provided');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await User.findById(decoded.id);
    if (!user) throw new AuthenticationError('Invalid token');

    if (user.role !== 'admin') {
      throw new AuthorizationError('Admin access required');
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (isErrorWithMessage(error)) {
      res.status(500).json(errorResponse('Internal Server Error', error));
    } else {
      res.status(500).json(errorResponse('An unknown error occurred'));
    }
  }
};
