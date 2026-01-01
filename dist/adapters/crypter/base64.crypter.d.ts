import { CryptPort } from "../../core/ports/crypt.port";
export declare class Base64Crypter implements CryptPort {
    encrypt(data: unknown): string;
    decrypt(token: string): any;
    sign(object: any): string;
    verify(token: string): boolean;
}
