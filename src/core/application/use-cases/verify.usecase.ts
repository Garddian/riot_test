import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";
import { VerifyPayload } from "../../domain/TypeVerifyPayload";

export class VerifyUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: VerifyPayload) {
        if (!this.crypt.isEncoded(data.signature)) {
            throw new DomainError('INVALID_PAYLOAD','Signature is required and must be a string');
        }
        return this.crypt.encrypt(data.data) === data.signature;
    }
}
