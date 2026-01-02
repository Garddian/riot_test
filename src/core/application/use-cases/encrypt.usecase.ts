import { CryptPort } from '../../ports/crypt.port';
import {JsonObject} from "../../domain/TypeJsonObject";

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
