import { CryptPort } from '../../ports/crypt.port';
export declare class DecryptUseCase {
    private readonly crypt;
    constructor(crypt: CryptPort);
    excute(data: JsonEncodedObject): Promise<JsonObject>;
}
