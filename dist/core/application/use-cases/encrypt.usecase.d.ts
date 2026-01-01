import { CryptPort } from '../../ports/crypt.port';
export declare class EncryptUseCase {
    private readonly crypt;
    constructor(crypt: CryptPort);
    excute(data: JsonObject): Promise<JsonEncodedObject>;
}
