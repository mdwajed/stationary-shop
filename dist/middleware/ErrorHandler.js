"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
// export interface AppError extends Error {
//   status?: number;
//   success?: boolean;
//   errors?: any;
// }
// export const errorHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   const statusCode = err.status || 500;
//   const isProduction = process.env.NODE_ENV === 'production';
//   // Log error details
//   console.error(`Error on ${req.method} ${req.url}:`, err);
//   // Build error response
//   const errorResponse = {
//     message: err.message || 'Internal Server Error',
//     success: false,
//     error: isProduction ? err.name : err.errors || err,
//     stack: isProduction ? undefined : err.stack,
//   };
//   // Send response
//   res.status(statusCode).json(errorResponse);
// };
class AppError extends Error {
    constructor(message, status, errors) {
        super(message);
        this.status = status;
        this.success = false;
        this.errors = errors || null;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const isProduction = process.env.NODE_ENV === 'production';
    // Log detailed errors in non-production environments
    if (!isProduction) {
        console.error(`Error on ${req.method} ${req.url}:`, err);
    }
    // Send error response
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        success: false,
        error: isProduction ? undefined : err.errors || err.name || 'Error',
        stack: isProduction ? undefined : err.stack,
    });
};
exports.errorHandler = errorHandler;
