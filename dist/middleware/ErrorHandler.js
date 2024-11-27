"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Default to 500 if no status is set
    const isProduction = process.env.NODE_ENV === 'production';
    // Log error details
    console.error(`Error on ${req.method} ${req.url}:`, err);
    // Build error response
    const errorResponse = {
        message: err.message || 'Internal Server Error',
        success: false,
        error: isProduction ? err.name : err.errors || err, // Include error details in non-production
        stack: isProduction ? undefined : err.stack, // Include stack trace in non-production
    };
    // Send response
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
