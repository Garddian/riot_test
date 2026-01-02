import { CryptPort } from '../../ports/crypt.port';

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
