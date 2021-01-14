export class DataError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    static invalidRequest(message) {
        return new DataError(400, message || "Invalid Request");
    }
    static notFound(message) {
        return new DataError(404, message || "Not Found");
    }
}
//# sourceMappingURL=errors.js.map