import { EncryptUseCase } from '../../core/application/use-cases/encrypt.usecase';
import { DecryptUseCase } from "../../core/application/use-cases/decrypt.usecase";
export declare class JsonController {
    private readonly encrypt;
    private readonly decrypt;
    constructor(encrypt: EncryptUseCase, decrypt: DecryptUseCase);
    encryptAction(body: JsonObject): Promise<JsonEncodedObject>;
    decryptAction(body: JsonEncodedObject): Promise<JsonObject>;
}
