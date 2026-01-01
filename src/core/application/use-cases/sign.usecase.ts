import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";

export class SignUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        return {
            "signature": this.crypt.sign(data)
        };
    }
}
