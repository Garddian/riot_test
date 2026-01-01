export class DomainError extends Error {
    constructor(
        public readonly code: 'INVALID_PAYLOAD' | 'INVALID_SIGNATURE',
        message: string,
    ) {
        super(message);
    }
}
