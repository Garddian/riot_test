import { CryptPort } from '../../ports/crypt.port';
import {JsonObject} from "../../domain/TypeJsonObject";

export class DecryptUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        let data_decrypted : JsonObject = {};
        for (let key in data) {
            if(typeof data[key] === 'string' && this.crypt.isEncoded(String(data[key]))) {
                data_decrypted[key] = this.crypt.decrypt(data[key]);
            } else {
                data_decrypted[key] = data[key];
            }

        }
        return data_decrypted;
    }
}
