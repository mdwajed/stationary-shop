interface ErrorDetails {
  field?: string;
  error?: string;
  [key: string]: unknown;
}

export class CustomError extends Error {
  statusCode: number;
  details?: ErrorDetails;

  constructor(message: string, statusCode: number, details?: ErrorDetails) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, details);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 500, details);
  }
}

// Utility to check if error has message
export function isErrorWithMessage(
  error: unknown,
): error is { message: string; statusCode?: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: string }).message === 'string'
  );
}
