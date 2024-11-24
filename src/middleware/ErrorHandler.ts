import { Request, Response, NextFunction } from "express";

export default (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
