import { CryptPort } from '../../ports/crypt.port';
import { DomainError } from "../../domain/DomainError";

export class EncryptUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        let data_encrypted : JsonObject = {};
        for (let key in data) {
            data_encrypted[key] = this.crypt.encrypt(data[key]);
        }
        return data_encrypted;
    }
}
