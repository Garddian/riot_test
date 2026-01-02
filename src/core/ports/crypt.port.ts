
export interface CryptPort {
    encrypt(data: unknown): StringEncoded;
    decrypt(token: unknown): any;
    isEncoded(token: string): token is StringEncoded;
}