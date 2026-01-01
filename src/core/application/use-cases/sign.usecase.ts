import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";

export class SignUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new DomainError('INVALID_PAYLOAD','Data must be a object or array');
        }
        return {
            "signature": this.crypt.sign(data)
        };
    }
}
