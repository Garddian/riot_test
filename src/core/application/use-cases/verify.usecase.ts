import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";

export class VerifyUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        if (typeof data.signature !== 'string' || !this.crypt.isEncoded(data.signature)) {
            throw new DomainError('INVALID_PAYLOAD','Signature is required and must be a string');
        }
        const {signature, ...dataToVerify} = data;
        return this.crypt.sign(dataToVerify) === signature;
    }
}
