export const successResponse = <T>(
  message: string,
  data: T | null = null,
  statusCode = 200,
) => ({
  success: true,
  message,
  statusCode,
  data,
});

export const errorResponse = <T>(
  message: string,
  error: T | null = null,
  statusCode = 400,
) => ({
  success: false,
  message,
  statusCode,
  error,
});
