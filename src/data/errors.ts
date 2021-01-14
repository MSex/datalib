export class DataError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }

  static invalidRequest(message?: string): DataError {
    return new DataError(400, message || "Invalid Request");
  }

  static notFound(message?: string): DataError {
    return new DataError(404, message || "Not Found");
  }
}
