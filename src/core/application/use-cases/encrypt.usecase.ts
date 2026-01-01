import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";

export class EncryptUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new DomainError('INVALID_PAYLOAD','Data must be a object or array');
        }
        let data_encrypted : JsonObject = {};
        for (let key in data) {
            data_encrypted[key] = this.crypt.encrypt(data[key]);
        }
        return data_encrypted;
    }
}
