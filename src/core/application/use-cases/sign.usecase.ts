import { CryptPort } from '../../ports/crypt.port';
import {JsonObject} from "../../domain/TypeJsonObject";

export class SignUseCase {
    constructor(
        private readonly crypt: CryptPort,
    ) {}

    async execute(data: JsonObject) {
        return {
            "signature": this.crypt.encrypt(data)
        };
    }
}
