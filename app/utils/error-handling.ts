/**
 * Error handling utilities
 */

/**
 * Safely logs errors without exposing sensitive information
 * @param message - Error context message
 * @param error - The error object
 */
export function logError(message: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`);
    if (process.env.NODE_ENV === 'development' && error.stack) {
      console.error(error.stack);
    }
  } else {
    console.error(`${message}: ${String(error)}`);
  }
}

/**
 * Creates a standardized API error response
 * @param status - HTTP status code
 * @param message - User-facing error message
 * @param error - Original error (logged but not returned to client)
 * @returns NextResponse with appropriate error details
 */
export function createErrorResponse(
  status: number = 500,
  message: string = 'An unexpected error occurred',
  error?: unknown
): Response {
  // Log the detailed error for debugging
  if (error) {
    logError(message, error);
  }
  
  // Return a sanitized error to the client
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

/**
 * Wraps an API handler with standardized error handling
 * @param handler - The API route handler function
 * @returns A wrapped handler with error handling
 */
export function withErrorHandling(
  handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      return createErrorResponse(500, 'An unexpected error occurred', error);
    }
  };
}
