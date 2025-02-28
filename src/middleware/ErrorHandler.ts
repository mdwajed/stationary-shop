// import { Request, Response } from 'express';
// export class AppError extends Error {
//   status: number;
//   success: boolean;
//   errors: unknown;

//   constructor(message: string, status: number, errors?: unknown) {
//     super(message);
//     this.status = status;
//     this.success = false;
//     this.errors = errors || null;

//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export const errorHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
// ): void => {
//   const statusCode = err.status || 500;
//   // eslint-disable-next-line no-undef
//   const isProduction = process.env.NODE_ENV === 'production';

//   // Log detailed errors in non-production environments
//   if (!isProduction) {
//     console.error(`Error on ${req.method} ${req.url}:`, err);
//   }

//   // Send error response
//   res.status(statusCode).json({
//     message: err.message || 'Internal Server Error',
//     success: false,
//     error: isProduction ? undefined : err.errors || err.name || 'Error',
//     stack: isProduction ? undefined : err.stack,
//   });
// };
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  status: number;
  success: boolean;
  errors: unknown;

  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.status = status;
    this.success = false;
    this.errors = errors || null;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('ErrorHandler called with:', err);

  // Ensure `res` is a valid response object before calling `res.status()`
  if (!res || typeof res.status !== 'function') {
    console.error('Invalid response object passed to errorHandler:', res);
    return;
  }

  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error(`Error on ${req.method} ${req.url}:`, err);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    success: false,
    error: isProduction ? undefined : err.errors || err.name || 'Error',
    stack: isProduction ? undefined : err.stack,
  });
};
