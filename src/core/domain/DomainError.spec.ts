// src/core/domain/errors/domain-error.spec.ts
import { DomainError } from './DomainError';

describe('DomainError', () => {
    it('should be an instance of Error', () => {
        const error = new DomainError('INVALID_PAYLOAD', 'Invalid payload');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(DomainError);
    });

    it('should set the error message', () => {
        const error = new DomainError('INVALID_PAYLOAD', 'Invalid payload');

        expect(error.message).toBe('Invalid payload');
    });

    it('should expose the error code', () => {
        const error = new DomainError('INVALID_SIGNATURE', 'Signature is invalid');

        expect(error.code).toBe('INVALID_SIGNATURE');
    });

    it('should have the correct name', () => {
        const error = new DomainError('INVALID_PAYLOAD', 'Invalid payload');

        expect(error.name).toBe('Error'); // comportement JS standard
    });
});
