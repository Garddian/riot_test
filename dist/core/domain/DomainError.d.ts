export declare class DomainError extends Error {
    readonly code: 'INVALID_PAYLOAD' | 'INVALID_SIGNATURE';
    constructor(code: 'INVALID_PAYLOAD' | 'INVALID_SIGNATURE', message: string);
}
