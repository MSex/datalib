export declare class DataError extends Error {
    readonly code: number;
    constructor(code: number, message: string);
    static invalidRequest(message?: string): DataError;
    static notFound(message?: string): DataError;
}
//# sourceMappingURL=errors.d.ts.map